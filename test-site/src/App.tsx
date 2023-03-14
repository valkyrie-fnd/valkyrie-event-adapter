import { Button, Chip, Paper, TextField, Tooltip, LinearProgress, IconButton, Switch, Typography, FormControl, FormLabel, ButtonGroup } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeOnIcon from '@mui/icons-material/VolumeUp';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

type LoadDone = {
  status: string
};

type LoadError = {
  reason: string
};
type LoadProgress = {
  progress: number
  count: number
  firstUpdate: number
};
type ActionEvent = {
  action: string
}

function App() {
  const gameFrame = useRef<HTMLIFrameElement>(null);
  const [url, setUrl] = useState<string>();
  const [gameUrl, setGameUrl] = useState<string>();
  const [loadDone, setLoadDone] = useState<LoadDone | undefined>();
  const [loadError, setLoadError] = useState<LoadError | undefined>();
  const [loadProgress, setLoadProgress] = useState<LoadProgress | undefined>();
  const [gameIdle, setGameIdle] = useState<boolean>(false);
  const [gameBusy, setGameBusy] = useState<boolean>(false);
  const [openCashier, setOpenCashier] = useState(false);
  const [openLobby, setOpenLobby] = useState(false);
  const [openHome, setOpenHome] = useState(false);
  const [fullscreen, setFullscreen] = useState<ActionEvent | undefined>();
  const [autoPlay, setAutoPlay] = useState<ActionEvent | undefined>();
  const [sendAutoPlay, setSendAutoPlay] = useState("");
  const [volumeMuted, setVolumeMuted] = useState(false);
  const goToSite = () => {
    setGameUrl(url);
  };
  const clearData = () => {
    setUrl("");
    setGameUrl("");
    setLoadDone(undefined);
    setLoadError(undefined);
    setLoadProgress(undefined);
    setGameBusy(false);
    setGameIdle(false);
    setOpenCashier(false);
    setOpenHome(false);
    setOpenLobby(false);
    setFullscreen(undefined);
    setAutoPlay(undefined);
    setSendAutoPlay("");
  }
  const sendRefreshBalance = () => {
    gameFrame.current?.contentWindow?.postMessage({ type: "VALKYRIE_REFRESH_BALANCE" }, '*');
  }
  const sendVolumeMuted = (muted: boolean) => {
    setVolumeMuted(muted);
    gameFrame.current?.contentWindow?.postMessage({ type: "VALKYRIE_VOLUME", action: muted }, '*');
  }
  const autoPlayClicked = (action: string) => {
    setSendAutoPlay(action);
    gameFrame.current?.contentWindow?.postMessage({ type: "VALKYRIE_AUTOPLAY", action }, '*');
  }
  const updateLoadProgress = useCallback((data: LoadProgress) => {
    if (loadProgress) {
      loadProgress.count++;
      setLoadProgress({ ...loadProgress, progress: data.progress });
    } else {
      setLoadProgress({
        progress: data.progress,
        count: 1,
        firstUpdate: data.progress,
      });
    }
  }, [loadProgress])
  useEffect(() => {
    console.log("useEffect");
    const listener = (e: MessageEvent<any>) => {
      console.log("Listener", e);
      switch (e.data?.type) {
        case "VALKYRIE_LOAD_DONE":
          setLoadDone(e.data);
          break;
        case "VALKYRIE_LOAD_ERROR":
          setLoadError(e.data);
          break;
        case "VALKYRIE_LOAD_PROGRESS":
          updateLoadProgress(e.data);
          break;
        case "VALKYRIE_GAME_IDLE":
          setGameIdle(true);
          setGameBusy(false);
          break;
        case "VALKYRIE_GAME_BUSY":
          setGameBusy(true);
          setGameIdle(false);
          break;
        case "VALKYRIE_FULLSCREEN":
          setFullscreen({ action: e.data.action });
          break;
        case "vALKYRIE_AUTOPLAY":
          setAutoPlay({ action: e.data.action });
          break;
        default:
          return;
      }
    }
    window.addEventListener("message", listener);
    return () => { window.removeEventListener("message", listener); }
  }, [updateLoadProgress]);

  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h2"> Valkyrie event adapter test site</Typography>
      </header>
      <div className="events">
        <Paper elevation={3} className="event-paper">
          <div className="event-paper-header">
            <Typography>Game Loaded event</Typography>
            {loadDone && <CheckIcon color={loadDone.status === 'done' ? 'primary' : 'warning'} />}
            <Tooltip title="Clear data">
              <IconButton
                disabled={!loadDone}
                onClick={() => setLoadDone(undefined)}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </div>
          {loadDone && loadDone.status !== 'done' && <Typography>Invalid status on load done</Typography>}
          {loadDone && <Typography> {JSON.stringify(loadDone)} </Typography>}
          {!loadDone && <Typography>No event</Typography>}
        </Paper>
        <Paper elevation={3} className='event-paper'>
          <div className="event-paper-header">
            <Typography>Game Load Error</Typography>
            {loadError && <CheckIcon color={loadError.reason ? 'primary' : 'warning'} />}
            <Tooltip title="Clear data">
              <IconButton
                disabled={!loadError}
                onClick={() => setLoadError(undefined)}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </div>
          {loadError && !loadError.reason && <Typography>Error should exist on reason prop</Typography>}
          {loadError && <Typography> {JSON.stringify(loadError)} </Typography>}
          {!loadError && <Typography>No event</Typography>}
        </Paper>
        <Paper elevation={3} className='event-paper'>
          <div className="event-paper-header">
            <Typography>Game Loading Progress</Typography>
            {loadProgress && <CheckIcon color={loadProgress.progress < 100 ? 'warning' : 'success'} />}
            <Tooltip title="Clear data">
              <IconButton
                disabled={!loadProgress}
                onClick={() => setLoadProgress(undefined)}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </div>
          {loadProgress &&
            <div>
              <LinearProgress variant="determinate" value={loadProgress.progress} />
              <Typography>Progress: {loadProgress.progress}</Typography>
              <Typography>Event Count: {loadProgress.count}</Typography>
              <Typography>First update: {loadProgress.firstUpdate} </Typography>
            </div>}
          {!loadProgress && <Typography>No event</Typography>}
        </Paper>
      </div>
      <div className='events'>
        <Chip
          label="Game Idle"
          color={gameIdle ? 'primary' : 'default'}
          deleteIcon={
            <Tooltip title="Clear data">
              <HighlightOffOutlinedIcon />
            </Tooltip>}
          onDelete={() => { setGameIdle(false) }} />
        <Chip
          label="Game Busy"
          color={gameBusy ? 'primary' : 'default'}
          deleteIcon={
            <Tooltip title="Clear data">
              <HighlightOffOutlinedIcon />
            </Tooltip>}
          onDelete={() => { setGameBusy(false) }} />
        <Chip
          label="Open Cashier"
          color={openCashier ? 'primary' : 'default'}
          deleteIcon={
            <Tooltip title="Clear data">
              <HighlightOffOutlinedIcon />
            </Tooltip>}
          onDelete={() => { setOpenCashier(false) }} />
        <Chip
          label="Open Lobby"
          color={openLobby ? 'primary' : 'default'}
          deleteIcon={
            <Tooltip title="Clear data">
              <HighlightOffOutlinedIcon />
            </Tooltip>}
          onDelete={() => { setOpenLobby(false) }} />
        <Chip
          label="Open Home"
          color={openHome ? 'primary' : 'default'}
          deleteIcon={
            <Tooltip title="Clear data">
              <HighlightOffOutlinedIcon />
            </Tooltip>}
          onDelete={() => { setOpenHome(false) }} />
        <Chip
          label={fullscreen?.action ? 'Last Fullscreen: ' + fullscreen?.action : 'Last Fullscreen:'}
          color={fullscreen ? 'primary' : 'default'}
          deleteIcon={
            <Tooltip title="Clear data">
              <HighlightOffOutlinedIcon />
            </Tooltip>}
          onDelete={() => { setFullscreen(undefined) }} />
        <Chip
          label={autoPlay?.action ? 'Last Autoplay: ' + autoPlay?.action : 'Last Autoplay:'}
          color={autoPlay ? 'primary' : 'default'}
          deleteIcon={
            <Tooltip title="Clear data">
              <HighlightOffOutlinedIcon />
            </Tooltip>}
          onDelete={() => { setAutoPlay(undefined) }} />
      </div>
      <Typography variant="h4">
        Send Events to frame
      </Typography>
      <div className="events">
        <FormControl>
          <FormLabel>Send Auto Play </FormLabel>
          <ButtonGroup variant="contained">
            <Button
              color={sendAutoPlay === "stop" ? 'secondary' : 'primary'}
              onClick={() => { autoPlayClicked("stop"); }}
            >Stop</Button>
            <Button
              color={sendAutoPlay === "pause" ? 'secondary' : 'primary'}
              onClick={() => { autoPlayClicked("pause"); }}
            >Pause</Button>
            <Button
              color={sendAutoPlay === "resume" ? 'secondary' : 'primary'}
              onClick={() => { autoPlayClicked("resume"); }}
            >Resume</Button>
          </ButtonGroup>
        </FormControl>
        <FormControl >
          <FormLabel>Send Volume </FormLabel>
          <div className="vol-switch">
            <VolumeOnIcon color={volumeMuted ? 'disabled' : 'primary'} />
            <Switch checked={volumeMuted} onChange={() => { sendVolumeMuted(!volumeMuted); }} />
            <VolumeOffIcon color={volumeMuted ? 'primary' : 'disabled'} />
          </div>
        </FormControl>
        <FormControl>
          <FormLabel>Send Refresh Balance</FormLabel>
          <div>
            <Button color="primary" variant="contained" onClick={() => { sendRefreshBalance(); }}>
              <AccountBalanceIcon />
            </Button>
          </div>
        </FormControl>
      </div>
      <div className="game-url">
        <TextField label="Game url test" onChange={(v) => setUrl(v.target.value)} value={url} />
        <Button variant="contained" onClick={goToSite}>Go to site</Button>
        <Button variant="contained" onClick={clearData}>Clear all data</Button>
      </div>
      <iframe ref={gameFrame} title="gameFrame" src={gameUrl}></iframe>

    </div >
  );
}

export default App;

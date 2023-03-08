import { Box, Button, Chip, Paper, TextField, Tooltip, LinearProgress, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
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
  const [url, setUrl] = useState<string>();
  const [gameUrl, setGameUrl] = useState<string>();
  const [loadDone, setLoadDone] = useState<LoadDone | undefined>({ status: "done" });
  const [loadError, setLoadError] = useState<LoadError | undefined>({ reason: "poop" });
  const [loadProgress, setLoadProgress] = useState<LoadProgress | undefined>();
  const [gameIdle, setGameIdle] = useState<boolean>(false);
  const [gameBusy, setGameBusy] = useState<boolean>(false);
  const [openCashier, setOpenCashier] = useState(false);
  const [openLobby, setOpenLobby] = useState(false);
  const [openHome, setOpenHome] = useState(false);
  const [fullscreen, setFullscreen] = useState<ActionEvent | undefined>();
  const [autoPlay, setAutoPlay] = useState<ActionEvent | undefined>();
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
  }
  useEffect(() => {
    setTimeout(() => {
      if (loadProgress && loadProgress.progress >= 100) {
        return
      }
      if (loadProgress) {
        loadProgress.count++;
        setLoadProgress({ ...loadProgress, progress: loadProgress.progress + 1 });
      } else {
        setLoadProgress({
          progress: 0,
          count: 1,
          firstUpdate: 0,
        });
      }
    }, 100);
  }, [loadProgress])

  window.addEventListener("message", (e) => {
    switch (e.data?.type) {
      case "VALKYRIE_LOAD_DONE":
        setLoadDone(e.data);
        break;
      case "VALKYRIE_LOAD_ERROR":
        setLoadError(e.data);
        break;
      case "VALKYRIE_LOAD_PROGRESS":
        if (loadProgress) {
          loadProgress.count++;
          setLoadProgress({ ...loadProgress, progress: e.data.progress });
        } else {
          setLoadProgress({
            progress: e.data.progress,
            count: 1,
            firstUpdate: e.data.progress,
          });
        }
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
  })

  return (
    <div className="App">
      <header className="App-header">
        Valkyrie event adapter test site
      </header>
      <div className="received-events">
        <Paper elevation={3} className="event-paper">
          <div className="event-paper-header">
            <div>Game Loaded event</div>
            {loadDone ? <CheckIcon color={loadDone.status === 'done' ? 'primary' : 'warning'} /> : ''}
            <Tooltip title="Clear data">
              <IconButton
                disabled={!loadDone}
                onClick={() => setLoadDone(undefined)}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </div>
          {loadDone && loadDone.status !== 'done' ? <div>Invalid status on load done</div> : ''}
          {loadDone ? <div> {JSON.stringify(loadDone)} </div> : ''}
        </Paper>
        <Paper elevation={3} className='event-paper'>
          <div className="event-paper-header">
            <div>Game Load Error</div>
            {loadError ? <CheckIcon color={loadError.reason ? 'primary' : 'warning'} /> : ''}
            <Tooltip title="Clear data">
              <IconButton
                disabled={!loadError}
                onClick={() => setLoadError(undefined)}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </div>
          {loadError && !loadError.reason ? <div>Error should exist on reason prop</div> : ''}
          {loadError ? <div> {JSON.stringify(loadError)} </div> : ''}
        </Paper>
        <Paper elevation={3} className='event-paper'>
          <div className="event-paper-header">
            <div>Game Loading Progress</div>
            {loadProgress ? <CheckIcon color={loadProgress.progress < 100 ? 'warning' : 'success'} /> : ''}
            <Tooltip title="Clear data">
              <IconButton
                disabled={!loadProgress}
                onClick={() => setLoadProgress(undefined)}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </div>
          {loadProgress ?
            <div>
              <LinearProgress variant="determinate" value={loadProgress.progress} />
              <div>Progress: {loadProgress.progress}</div>
              <div>Event Count: {loadProgress.count}</div>
              <div>First update: {loadProgress.firstUpdate} </div>
            </div> : ''}
        </Paper>
      </div>

      <div className='received-events'>
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
          label={'Last Fullscreen: ' + fullscreen?.action}
          color={fullscreen ? 'primary' : 'default'}
          deleteIcon={
            <Tooltip title="Clear data">
              <HighlightOffOutlinedIcon />
            </Tooltip>}
          onDelete={() => { setFullscreen(undefined) }} />
        <Chip
          label={'Last Autoplay: ' + autoPlay?.action}
          color={autoPlay ? 'primary' : 'default'}
          deleteIcon={
            <Tooltip title="Clear data">
              <HighlightOffOutlinedIcon />
            </Tooltip>}
          onDelete={() => { setAutoPlay(undefined) }} />
      </div>

      <Container>
        <Button>Send Autoplay</Button>
        <Button>Send Volume</Button>
        <Button>Send Refresh Balance</Button>
      </Container>
      <div className="game-url">
        <TextField label="Game url test" onChange={(v) => setUrl(v.target.value)} value={url} />
        <Button variant="contained" onClick={goToSite}>Go to site</Button>
        <Button variant="contained" onClick={clearData}>Clear all data</Button>
      </div>
      <iframe title="gameFrame" src={gameUrl}></iframe>

    </div >
  );
}

export default App;

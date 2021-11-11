import { FC } from 'react';

type ControlsType = {
  onRandomWinner: VoidFunction;
  onResetWinner: VoidFunction;
  onSignOut: VoidFunction;
  isWinner: boolean;
};

const Controls: FC<ControlsType> = ({
  onRandomWinner,
  onResetWinner,
  onSignOut,
  isWinner,
}) => {
  return (
    <div className="col-12">
      <button
        onClick={onRandomWinner}
        className="btn btn-primary"
        style={{ float: 'left' }}
        disabled={isWinner}
      >
        Random Winner
      </button>

      <button
        onClick={onResetWinner}
        className="btn btn-warning"
        style={{ marginLeft: 15 }}
        disabled={!isWinner}
      >
        Reset
      </button>
      <button className="btn btn-danger btn-signout" onClick={onSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Controls;

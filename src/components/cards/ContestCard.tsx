import { FC, useEffect, useState } from 'react';
import Contest from '../../models/contest.model';
type ContestCardProps = {
  contest: Contest;
  onUpdateContest: Function;
  onDeleteContest: Function;
};

const ContestCard: FC<ContestCardProps> = ({
  contest,
  onUpdateContest,
  onDeleteContest,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [contestName, setContestName] = useState('');

  useEffect(() => {
    setContestName(contest.name);
    return () => {};
  }, [contest.name]);

  return (
    <div className={`contest-card ${isUpdating ? 'flipped' : ''}`}>
      <div className="inner">
        <div className="front">
          <div>
            <form
              onSubmit={(event) => {
                onUpdateContest(event, contest.uid, contestName);
                setIsUpdating(false);
              }}
            >
              <input
                type="text"
                className="form-control input-lg"
                value={contestName}
                autoFocus
                onChange={(e) => setContestName(e.target.value)}
              />
            </form>
            <button
              onClick={() => {
                setIsUpdating(false);
                setContestName(contest.name);
              }}
              className="btn btn-danger"
              style={{ marginLeft: 40 }}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className={`${contest.isWinner ? 'winner' : 'back'}`}>
          <div
            className="delete"
            onClick={() => onDeleteContest(contest.uid as string)}
          >
            <span
              className="glyphicon glyphicon-trash"
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                color: 'red',
              }}
              aria-hidden="true"
            ></span>
          </div>

          <div
            className="card-item"
            onClick={() => setIsUpdating(true && !contest.isWinner)}
          >
            {contest.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;

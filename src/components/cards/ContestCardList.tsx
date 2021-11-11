import { FC } from 'react';
import Contest from '../../models/contest.model';
import ContestCard from './ContestCard';

type ContestCardListType = {
  contests: Contest[];
  onUpdateContest: Function;
  onDeleteContest: Function;
};

const ContestCardList: FC<ContestCardListType> = ({
  contests,
  onUpdateContest,
  onDeleteContest,
}) => {
  return (
    <div className="col-sm">
      <div className="app">
        <div className="cards">
          {contests.slice().map((contest: Contest, key: number) => (
            <ContestCard
              key={key}
              contest={contest}
              onUpdateContest={onUpdateContest}
              onDeleteContest={onDeleteContest}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContestCardList;

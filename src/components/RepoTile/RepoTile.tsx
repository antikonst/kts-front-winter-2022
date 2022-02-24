import React from "react";

import Avatar from "@components/Avatar";
import StartIcon from "@components/StarIcon";
import { RepoItem } from "@store/GitHubStore/types";
import { Tooltip } from "antd";
import "./RepoTile.css";
import { format, compareAsc } from "date-fns";

export type RepoTileProps = {
  onClick?: (e: React.MouseEvent) => void;
  repo: RepoItem;
};

const RepoTile: React.FC<RepoTileProps> = ({ onClick, repo }) => (
  <Tooltip title="Посмотреть ветки репозитория">
    <div className="git-repo-tile" onClick={onClick}>
      <div className="git-repo-tile__background">
        <Avatar src={repo.owner.avatar_url}></Avatar>
      </div>
      <div className="git-repo-tile__content">
        <div className="git-repo-tile__content-repo-name">
          <b> {repo.name} </b>
        </div>
        <div>
          <a className="git-repo-tile__content-org-name" href={repo.owner.url}>
            {repo.owner.login}
          </a>
        </div>
        <div className="git-repo-tile__content-params-name">
          <StartIcon></StartIcon>
          <small className="git-repo-tile__num-star">
            {repo.stargazers_count}
          </small>
          <small className="git-repo-tile__update">
            Updated {format(new Date(repo.updated_at), "dd MMM")}
          </small>
        </div>
      </div>
    </div>
  </Tooltip>
);

export default React.memo(RepoTile);

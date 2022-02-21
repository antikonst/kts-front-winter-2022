import React, { useEffect, useState } from "react";

import GitHubStore from "@store/GitHubStore";
import { BranchItem, RepoItem } from "@store/GitHubStore/types";
import { Drawer } from "antd";
declare type EventType =
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

export type RepoBranchesDrawerProps = {
  selectedRepo: RepoItem;
  onClose: () => void;
  visible: boolean;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  selectedRepo,
  onClose,
  visible,
}) => {
  const [branchesList, setBranchesList] = useState<BranchItem[]>([]);

  useEffect(() => {
    const getBranches = async (
      EXAMPLE_ORGANIZATION = selectedRepo.owner.login,
      EXAMPLE_REPO = selectedRepo.name
    ) => {
      try {
        await new GitHubStore()
          .getRepoBranchesList({
            ownerName: EXAMPLE_ORGANIZATION,
            repoName: EXAMPLE_REPO,
          })
          .then((branch) => setBranchesList(branch.data));
      } catch (err) {}
    };
    getBranches();
  }, [selectedRepo.owner.login, selectedRepo.name]);

  return (
    <Drawer
      title="Список веток"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      {Boolean(branchesList.length) &&
        branchesList.map((branch, i) => (
          <p key={i}>
            {i + 1}. {branch.name}
          </p>
        ))}
    </Drawer>
  );
};

export default React.memo(RepoBranchesDrawer);

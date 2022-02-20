import { useState } from "react";
import React from "react";
import { useEffect } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import "./ReposSearchPage.css";
import GitHubStore from "@store/GitHubStore/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import { Spin, BackTop, Drawer } from "antd";

function ReposSearchPage() {
  const [repoList, setRepoList] = useState<RepoItem[]>([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getRepos = async () => {
      const EXAMPLE_ORGANIZATION = "kubernetes";
      try {
        await new GitHubStore()
          .getOrganizationReposList({
            organizationName: EXAMPLE_ORGANIZATION,
          })
          .then((repo) => setRepoList(repo.data))
          .finally(() => {
            setIsLoading(false);
            setDisabled(false);
          });
      } catch (err) {}
    };
    getRepos();
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSearch = () => {
    const filteredData = repoList.filter((repo) => {
      return repo.name.toLowerCase().includes(value.toLowerCase());
    });
    setRepoList(filteredData);
    setDisabled(true);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  let btnClass = "btn-search";
  return (
    <Spin spinning={isLoading} tip="Loading...">
      <div className="grid-search row">
        <Input
          placeholder="Введите название репозитория"
          onChange={handleChange}
          value={value}
        />
        <Button className={btnClass} onClick={handleSearch} disabled={disabled}>
          <SearchIcon />
        </Button>
      </div>
      <div className="row">
        {repoList.map((repo) => (
          <React.Fragment key={repo.id}>
            <RepoTile repo={repo} onClick={showDrawer} />
            <RepoBranchesDrawer
              selectedRepo={repo}
              onClose={onClose}
              visible={visible}
            />
          </React.Fragment>
        ))}
        {!repoList.length && <span>Репозиториев не найдено</span>}
      </div>
    </Spin>
  );
}

export default ReposSearchPage;

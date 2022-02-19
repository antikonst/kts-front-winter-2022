/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoItem)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репоизториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */

 import { ApiResponse } from "src/shared/store/ApiStore/types";

 // Параметры запроса
 export type GetOrganizationReposListParams = {
   organizationName: string;
 };
 
 // Параметры запроса
 export type GetRepoBranchesLisParams = {
   ownerName: string;
   repoName: string;
 };
 
 export type GitHubRepoOwner = {
   id: number;
   login: string;
   avatar_url: string;
   url: string;
 };
 
 export type RepoItem = {
   id: string;
   name: string;
   url: string;
   private: boolean;
   stargazers_count: number;
   owner: GitHubRepoOwner;
   updated_at: Date;
 };
 
 export type BranchItem = {
   name: string;
   protected: boolean;
   protection_url: string;
 };
 
 export interface IGitHubStore {
   getOrganizationReposList(
     params: GetOrganizationReposListParams
   ): Promise<ApiResponse<RepoItem[], any>>;
 
   getRepoBranchesList(
     params: GetRepoBranchesLisParams
   ): Promise<ApiResponse<BranchItem[], any>>;
 }
 
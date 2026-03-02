# 前端接口完整清单

> 基于 `.env` 环境配置文件解析变量，导出所有 `src/api/` 下的接口。

## 环境变量映射表

| 变量名 | 解析值 |
|-------|-------|
| VITE_AGENT_BASE | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1` |
| VITE_PLATFORM_BASE | `/zte-studio-ai-platform/api/v1` |
| VITE_PLATFORM_PROXY_BASE | `/zte-studio-ai-platform/proxy/aiserver/api/v1` |
| VITE_PLATFORM_OPENAI_BASE | `/zte-studio-ai-platform/openapi/v1` |
| VITE_KBASE_BASE | `/zte-studio-iaab-kbase/api/v1` |
| VITE_PROMPT_BASE | `/zte-studio-ai-prompt/api/v1` |
| VITE_PROMPT_OPENAI_BASE | `/zte-studio-ai-prompt/openapi/v1` |
| VITE_CODEBASE_WIKI | `/zte-studio-ai-codebasewiki/api/v1` |
| VITE_WORKFLOW_BASE | `/zte-studio-ai-bff/aab-workflow/api/aab-workflow/v1` |
| VITE_FACTORY_BASE | `/zte-studio-ai-bff/ifactory-agent-dev/api/ifactory-agent-dev/v1` |
| VITE_UPLOADMANAGER_BASE | `/zte-studio-iaab-uploadmanager/api/v1` |
| VITE_UPORTAL_BASE | `/zte-uniwork-uportal-api` |
| VITE_NAE_BFF_BASE | `/zte-studio-ai-bff/nae-assetcenterservice/api/nae-assetcenterservice/v1` |
| VITE_SKILL | `/zte-studio-ai-bff/zae-apirefineservice` |
| VITE_ZAE_BASE | `/zte-studio-ai-bff/zae-apirefineservice` |
| VITE_NAE_BASE | `/zte-studio-ai-bff/nae-mcpserver` |
| VITE_NAE_KBASE_BASE | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1` |
| VITE_ZAE_BS_BASE | `/zte-studio-ai-bff/zae-bs-modeladapter` |
| VITE_BFF_API_BASE | `/zte-studio-ai-bff/api/v1` |
| VITE_PROMPTADAPTER_BASE | `/api/promptadapter`（未在 .env 中配置，取默认值） |
| VITE_PLATFORM_BASE_OTAF | `/zte-studio-ai-platform`（仅 onemachine 环境） |

---

## 1. agent.js — Agent 模板管理

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | createAgentApi | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/agent/template/create` |
| 2 | getAgentListApi | GET | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/agent/list` |
| 3 | getAgentDetailApi | GET | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/agent/template/configure/{agentId}` |
| 4 | deleteAgentApi | DELETE | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/agent/template/delete/{agentId}` |
| 5 | updateAgentApi | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/agent/template/update?isUpdate={isUpdate}` |
| 6 | getAgentlogListApi | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/agent/log` |
| 7 | exportAgentApi | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/agent/export?agentId={agentId}` |
| 8 | getRolesList | POST | `/api/promptadapter/template/manager/query` |
| 9 | getSkillList | GET | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/agent/api/skill` |
| 10 | getWorkflowList | GET | `/zte-studio-ai-bff/aab-workflow/api/aab-workflow/v1/workflow/agent/workflows` |
| 11 | getAssetsByType | GET | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/agent/api/assets` |
| 12 | getApiDetail | GET | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/agent/api` |

---

## 2. agentApp.js — Agent 应用管理 & 评测

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | getMyAppList | GET | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/app/list` |
| 2 | publishMyApp | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/app/publish/{data}` |
| 3 | createApp | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/app` |
| 4 | getAppInfo | GET | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/app/detail/{id}` |
| 5 | deleteApp | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/app/delete/{id}` |
| 6 | updatedApp | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/app/detail` |
| 7 | getAppSettings | GET | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/app/configure/{appId}` |
| 8 | EditAppSettings | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/app/configure` |
| 9 | getModels | GET | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/gpt/app/model` |
| 10 | getAppTemplates | GET | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/agent/list` |
| 11 | getAppTemplateVersions | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/agent/log` |
| 12 | createEvaluationTaskApi | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluationJob/create` |
| 13 | startEvaluationTestCaseApi | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluationJob/expandData-and-create` |
| 14 | updateEvaluationTaskApi | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluationJob/update` |
| 15 | stopEvaluationApi | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluationJob/terminate` |
| 16 | deleteEvaluationTaskApi | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluationJob/delete` |
| 17 | getEvaluationTaskDetail | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluationJob/getDetail?jobId={jobId}` |
| 18 | copyEvaluationTaskApi | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluationJob/copy` |
| 19 | getEvaluationTaskApi | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluationJob/list?limit={pageSize}&offset={currentPage-1}` |
| 20 | importEvaluationSet | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluation/set/import` |
| 21 | exportEvaluationSet | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluation/set/export?id={id}` |
| 22 | getEvaluationSetList | GET | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluation/set` |
| 23 | getEvaluationSetListWithType | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluation/set/query?size={pageSize}&current={currentPage}` |
| 24 | getEvaluationSetTemplate | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluation/set/temp/export` |
| 25 | getEvaluationSetDetails | GET | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluation/set/data` |
| 26 | delEvaluationSet | DELETE | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluation/set/{id}` |
| 27 | publishEvaluationSet | PUT | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluation/set/{id}/publish` |
| 28 | unpublishEvaluationSet | PUT | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluation/set/{id}/unpublish` |
| 29 | getEvaluationResultApi | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluationJob/result/get?limit={pageSize}&offset={currentPage-1}` |
| 30 | exportEvaluationResultApi | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluationJob/result/export` |
| 31 | startEvaluationTaskApi | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluationJob/start` |
| 32 | handleEvaluationResultApi | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluationJob/result/label` |
| 33 | getUploadFile | GET | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/evaluation/set/download?name={name}` |
| 34 | exportAgentApp | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/app/custom/download/{id}?defaultCode={isDefault}` |
| 35 | importAgentApp | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/app/custom/upload/{id}` |
| 36 | createAgentChat | POST | `/zte-studio-ai-bff/ifactory-agent-dev/api/ifactory-agent-dev/v1/newagentsessionid` |
| 37 | getAgentById | GET | `/zte-studio-ai-platform/api/v1/app/quick?appId={appId}` |
| 38 | createAgentWithTemplate | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/app/quick` |
| 39 | updateAgentWithTemplate | POST | `/zte-studio-ai-platform/api/v1/app/quick/update` |
| 40 | createAgentTemplate | POST | `/zte-studio-ai-bff/aab-agent/api/aab-agent/v1/agent/template/create` |
| 41 | postAgentField | POST | `/zte-studio-ai-bff/ifactory-agent-dev/api/ifactory-agent-dev/v1/ai/auto/gen` |
| 42 | postAgentChat | POST | `/zte-studio-ai-bff/ifactory-agent-dev/api/ifactory-agent-dev/v1/agent/debug/chat` |
| 43 | updateAgent | POST | `/zte-studio-ai-bff/ifactory-agent-dev/api/ifactory-agent-dev/v1/agent/update` |
| 44 | heartbeatAgent | POST | `/zte-studio-ai-bff/ifactory-agent-dev/api/ifactory-agent-dev/v1/heartbeat` |
| 45 | createAgentFlow | POST | `/zte-studio-ai-bff/aab-workflow/api/aab-workflow/v1/workflow/schema` |
| 46 | getAgentFlow | GET | `/zte-studio-ai-bff/aab-workflow/api/aab-workflow/v1/workflow/schema?workflowId={params}` |
| 47 | getUacAppListApi | GET | `/zte-studio-ai-platform/api/v1/uac/authorized/apps` |

---

## 3. app.js — AI 应用配置 & 管理

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | getAICompletionModelApi | GET | `/zte-studio-ai-platform/api/v1/app/{appId}/completion/model` |
| 2 | getWorkflowAICompletionModelApi | GET | `/zte-studio-ai-platform/api/v1/app/{appId}/workflow/completion/model` |
| 3 | getAIModelConfigLLMs | GET | `/zte-studio-ai-platform/api/v1/app/{appId}/models` |
| 4 | getKbaseConfig | GET | `/zte-studio-iaab-kbase/api/v1/embedding/all` |
| 5 | getTagNamesFromKbaseIds | POST | `/zte-studio-iaab-kbase/api/v1/tags/names` |
| 6 | getDataType | GET | `/zte-studio-ai-platform/api/v1/sys?section=Preset&subsection=dataType` |
| 7 | getFullDirectoryTree | GET | `/zte-studio-iaab-kbase/api/v1/directory/fullDirectoryTree` |
| 8 | getAppCategory | GET | `/zte-studio-ai-platform/api/v1/sys?section=AppConfig&subsection=category` |
| 9 | getChatModelApi | GET | `/zte-studio-ai-platform/api/v1/sys?section=AppConfig&subsection=model` |
| 10 | getChatModelApiWithAuthority | GET | `/zte-studio-ai-platform/api/v1/app/{appId}/models` |
| 11 | getAppAgentChatModelApi | GET | `/zte-studio-ai-platform/api/v1/app/{appId}/agent/models` |
| 12 | getRunModeApi | GET | `/zte-studio-ai-platform/api/v1/app/{appId}/runModes` |
| 13 | getKnowledgeBaseApi | GET | `/zte-studio-iaab-kbase/api/v1/kbase/list/{modelId}` |
| 14 | saveAiConfigApi | POST | `/zte-studio-ai-platform/api/v1/app/configure/{appId}` |
| 15 | getAiConfigApi | GET | `/zte-studio-ai-platform/api/v1/app/configure/{appId}` |
| 16 | getApiKeyList | GET | `/zte-studio-ai-platform/api/v1/app/{appId}/apikey?keyScene={keyScene}&currentPage={currentPage}&pageSize={pageSize}` |
| 17 | getPlatformListApi | GET | `/zte-studio-ai-platform/api/v1/app/version/{appId}/publishAndShelfList` |
| 18 | queryPublishStatusApi | POST | `/zte-studio-ai-platform/api/v1/app/version/{appId}/queryPublishStatus` |
| 19 | operatePlatformApi | POST | `/zte-studio-ai-platform/api/v1/app/version/{appId}/modifyShelfStatus` |
| 20 | saveAgentCardApi | POST | `/zte-studio-ai-platform/api/v1/agentCard/config/{appId}` |
| 21 | getAgentCardApi | GET | `/zte-studio-ai-platform/api/v1/agentCard/config/{appId}` |
| 22 | operateApiKey | POST | `/zte-studio-ai-platform/api/v1/app/{appId}/apikey/{apikeyID}/status?statusFlag={statusFlag}` |
| 23 | deleteApiKey | POST | `/zte-studio-ai-platform/api/v1/app/{appId}/apikey/delete/{apikeyID}` |
| 24 | createApiKey | POST | `/zte-studio-ai-platform/api/v1/app/{appId}/apikey/create?keyScene={keyScene}` |
| 25 | getAppDetailApi | GET | `/zte-studio-ai-platform/api/v1/app/{appId}` |
| 26 | getAppStatusApi | GET | `/zte-studio-ai-platform/api/v1/app/version/{appId}/status` |
| 27 | publishAppApi | POST | `/zte-studio-ai-platform/api/v1/app/version/{appId}/publishApp` |
| 28 | getAppVersionLog | POST | `/zte-studio-ai-platform/api/v1/app/version/{appId}/log` |
| 29 | recoverAppVersionApi | GET | `/zte-studio-ai-platform/api/v1/app/version/{appId}/fetchConfigurationByVersion?appVersionId={appVersionId}` |
| 30 | updateAppDetailApi | POST | `/zte-studio-ai-platform/api/v1/app/{appId}` |
| 31 | switchAppConfigMode | POST | `/zte-studio-ai-platform/api/v1/app/{appId}` |
| 32 | saveAdvancedFlowConfig | POST | `/zte-studio-ai-platform/api/v1/flow?appId={appId}` |
| 33 | getAdvancedFlowConfig | GET | `/zte-studio-ai-platform/api/v1/flow?appId={appId}` |
| 34 | getContext | POST | `/zte-studio-ai-platform/api/v1/chatInfo/queryChatDetail?appId={appId}` |
| 35 | getDetail | POST | `/zte-studio-ai-platform/api/v1/trace/queryDetail?appId={appId}` |
| 36 | debugAdvancedFlow | POST | `/zte-studio-ai-platform/api/v1/app/chat/debug?appId={appId}` |
| 37 | getMarkDownContentApi | GET | `/zte-studio-ai-platform/openapi/v1/document` |
| 38 | getRolesListApi | GET | `/zte-studio-ai-platform/api/v1/roles` |
| 39 | deleteRoleApi | POST | `/zte-studio-ai-platform/api/v1/roles/delete` |
| 40 | addRolesApi | POST | `/zte-studio-ai-platform/api/v1/roles` |
| 41 | getUserListApi | GET | `/zte-studio-ai-platform/api/v1/user?queryKey={value}` |
| 42 | getPromptInfoApi | GET | `/zte-studio-ai-prompt/openapi/v1/prompt/{promptTemplateId}/importWrapper?mode={mode}` |
| 43 | getUserGuideApi | GET | `/zte-studio-ai-platform/api/v1/app/userGuide/{appId}` |
| 44 | getAppOperationData | POST | `/zte-studio-ai-platform/api/v1/app/{appId}/data/operations` |
| 45 | getAppHistoryData | POST | `/zte-studio-ai-platform/api/v1/app/{appId}/data/history?currentPage={currentPage}&pageSize={pageSize}` |
| 46 | exportAppHistoryData | POST | `/zte-studio-ai-platform/api/v1/app/{appId}/data/history/export` |
| 47 | getAppAgentConfig | GET | `/zte-studio-ai-platform/api/v1/agent/configure/{appId}` |
| 48 | updateAppAgentConfig | POST | `/zte-studio-ai-platform/api/v1/agent/configure/{appId}` |
| 49 | getAIGeneratedPrompt | POST | `/zte-studio-ai-platform/api/v1/app/{appId}/getPromptByModel` |
| 50 | saveWorkflowConfig | POST | `/zte-studio-ai-platform/api/v1/workflow/configure/{appId}` |
| 51 | getWorkflowConfig | GET | `/zte-studio-ai-platform/api/v1/workflow/configure/{appId}` |
| 52 | getKnowledgeGraphList | POST | `/zte-studio-ai-platform/api/v1/app/getKnowledgeGraphList` |

---

## 4. appChat.js — AI 应用对话

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | getMyAppList | POST | `/zte-studio-ai-platform/api/v1/app/search` |
| 2 | createApp | POST | `/zte-studio-ai-platform/api/v1/app` |
| 3 | deleteApp | POST | `/zte-studio-ai-platform/api/v1/app/delete/{id}` |
| 4 | copyAppApi | POST | `/zte-studio-ai-platform/api/v1/app/{id}/copy` |
| 5 | updatedAppInfo | POST | `/zte-studio-ai-platform/api/v1/app/{id}` |
| 6 | updateChatFile | POST | `/zte-studio-ai-platform/api/v1/app/{appId}/file/upload` |
| 7 | deleteUploadedChatFile | POST | `/zte-studio-ai-platform/api/v1/app/{appId}/file/delete` |
| 8 | updateModelChatFile | POST | `/zte-studio-ai-platform/api/v1/app/file/upload` |
| 9 | deleteModelUploadedChatFile | POST | `/zte-studio-ai-platform/api/v1/app/file/delete` |
| 10 | getAppModelApi | GET | `/zte-studio-ai-platform/api/v1/app/model/{appId}` |
| 11 | getModelListApi | GET | `/zte-studio-ai-platform/api/v1/app/models` |

---

## 5. asset.js — 资产管理

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | getAssetListApi | POST | `/zte-studio-ai-platform/api/v1/asset/query_authorized_asset` |
| 2 | getAssetDetailApi | POST | `/zte-studio-ai-bff/nae-assetcenterservice/api/nae-assetcenterservice/v1/asset/query/{assetId}` |
| 3 | deleteAssetApi (MCP) | POST | `/zte-studio-ai-platform/api/v1/asset/delete` |
| 4 | deleteAssetApi (APP) | POST | `/zte-studio-ai-bff/nae-assetcenterservice/api/nae-assetcenterservice/v1/asset/delete` |
| 5 | uninstallAssetApi | POST | `/zte-studio-ai-platform/api/v1/asset/uninstall` |
| 6 | installAssetApi | POST | `/zte-studio-ai-platform/api/v1/asset/install` |
| 7 | uninstallAppAssetApi | POST | `/zte-studio-ai-bff/nae-assetcenterservice/api/nae-assetcenterservice/v1/asset/uninstall` |
| 8 | installAppAssetApi | POST | `/zte-studio-ai-bff/nae-assetcenterservice/api/nae-assetcenterservice/v1/asset/install` |
| 9 | mcpRegisterParamApi | POST | `/zte-studio-ai-bff/nae-assetcenterservice/api/nae-assetcenterservice/v1/mcp/register/param` |
| 10 | getMCPServiceInfoApi | GET | `/zte-studio-ai-platform/api/v1/asset/mcp-service-info/{mcpName}` |
| 11 | getAgentServiceInfoApi | GET | `/zte-studio-ai-platform/api/v1/asset/agent-service-info/{agentName}` |

---

## 6. codeIndex.js — 代码索引

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | getCodeIndexPageApi | POST | `/zte-studio-iaab-kbase/api/v1/code-index/code-repo-register/page` |
| 2 | createCodeIndexApi | POST | `/zte-studio-iaab-kbase/api/v1/code-index/code-repo-register` |
| 3 | updateCodeIndexApi | PUT | `/zte-studio-iaab-kbase/api/v1/code-index/code-repo-register/{id}` |
| 4 | getCodeIndexDetailApi | GET | `/zte-studio-iaab-kbase/api/v1/code-index/code-repo-register/{id}` |
| 5 | deleteCodeIndexApi | DELETE | `/zte-studio-iaab-kbase/api/v1/code-index/code-repo-register/{id}` |
| 6 | executeCodeIndexApi | POST | `/zte-studio-iaab-kbase/api/v1/code-index/code-repo-register/{registerId}/execute` |
| 7 | findByRepoAndTenantApi | POST | `/zte-studio-iaab-kbase/api/v1/code-index/code-repo-register/findByRepoAndTenant` |

---

## 7. deepwiki.js — DeepWiki 代码知识库

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | deepwikiDetailApi | POST | `/zte-studio-ai-codebasewiki/api/v1/generate` |
| 2 | taskStatusApi | POST | `/zte-studio-ai-codebasewiki/api/v1/task_status` |
| 3 | deepwikiAskChatApi | POST | `/zte-studio-ai-codebasewiki/api/v1/ask/chat` |
| 4 | deepwikiExportMarkdownApi | POST | `/zte-studio-ai-codebasewiki/api/v1/export/markdown` |
| 5 | deepwikiExportJsonApi | POST | `/zte-studio-ai-codebasewiki/api/v1/export/json` |
| 6 | getChatSessionIdApi | POST | `/zte-studio-ai-codebasewiki/api/v1/ask/chat/create` |
| 7 | getWikiStatusApi | POST | `/zte-studio-ai-codebasewiki/api/v1/wiki/status` |
| 8 | shareCodeIndexApi | POST | `/zte-studio-ai-codebasewiki/api/v1/wiki/share` |
| 9 | getMcpConfigApi | GET | `/zte-studio-ai-codebasewiki/api/v1/mcp-servers` |

---

## 8. directory.js — 目录 & 文件管理

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | getDescendantsDirectoryList | GET | `/zte-studio-iaab-kbase/api/v1/directory/descendants` |
| 2 | getChildrenDirectoryList | GET | `/zte-studio-iaab-kbase/api/v1/directory/children` |
| 3 | createDirectory | POST | `/zte-studio-iaab-kbase/api/v1/directory` |
| 4 | modifyDirectoryName | POST | `/zte-studio-iaab-kbase/api/v1/directory/{id}?kbaseId={kbaseId}` |
| 5 | deleteDirectoryOrFile | POST | `/zte-studio-iaab-kbase/api/v1/directory/{id}/delete?kbaseId={kBaseId}` |
| 6 | deleteFile | POST | `/zte-studio-iaab-kbase/api/v1/file/{id}/delete?kbaseId={kBaseId}` |
| 7 | getPreviewUrl | POST | `/zte-studio-iaab-kbase/api/v1/file/doc/preview/?kbaseId={kbaseId}` |
| 8 | downloadFile | POST | `/zte-studio-iaab-kbase/api/v1/file/doc/download?kbaseId={kBaseId}` |
| 9 | getFileListApi | POST | `/zte-studio-iaab-kbase/api/v1/directory/search/pageFile?folderId={folderId}&kbaseId={kbaseId}` |
| 10 | downloadFileOut | GET | `/zte-studio-iaab-kbase/api/v1/file/doc/downloadFile` |
| 11 | moveDirectoryApi | POST | `/zte-studio-iaab-kbase/api/v1/directory/transfer` |
| 12 | moveFileApi | POST | `/zte-studio-iaab-kbase/api/v1/file/transfer` |
| 13 | getQAListApi | GET | `/zte-studio-iaab-kbase/api/v1/qa/search?parentId={categoryId}&kbaseId={kbaseId}&keyword={keyword}&currentPage={currentPage}&pageSize={pageSize}` |

---

## 9. extendedManagement.js — 扩展算子管理

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | queryPublishedListApi | POST | `/zte-studio-iaab-kbase/api/v1/operator/market/published/list` |
| 2 | queryMyOperatorListApi | POST | `/zte-studio-iaab-kbase/api/v1/operator/list` |
| 3 | exportOperatorApi | GET | `/zte-studio-iaab-kbase/api/v1/operator/{operatorType}/export/{operatorId}` |
| 4 | createOperatorApi | POST | `/zte-studio-iaab-kbase/api/v1/operator/import` |
| 5 | deleteOperatorApi | POST | `/zte-studio-iaab-kbase/api/v1/operator/delete/{operatorId}` |
| 6 | publishOperatorListApi | POST | `/zte-studio-iaab-kbase/api/v1/operator/{operatorType}/version/latest/publish` |
| 7 | getOperatorTypeApi | GET | `/zte-studio-iaab-kbase/api/v1/operator/type/list` |
| 8 | exportOperatorTemplateApi | GET | `/zte-studio-iaab-kbase/api/v1/operator/template/download` |
| 9 | getFileParseByFileTypeApi | GET | `/zte-studio-iaab-kbase/api/v1/operator/file_parse/supported-format` |
| 10 | editOperatorApi | POST | `/zte-studio-iaab-kbase/api/v1/operator/edit/{operatorId}` |
| 11 | getTextSplitApi | GET | `/zte-studio-iaab-kbase/api/v1/operator/text_split/supported` |
| 12 | getOperatorPermissionApi | GET | `/zte-studio-iaab-kbase/api/v1/operator/operator-permission-check` |

---

## 10. kbSetting.js — 知识库安全策略

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | kbPolicyPageApi | POST | `/zte-studio-iaab-kbase/api/v1/kbase/sec-policy/query/page` |
| 2 | multiDeleteSecPolicyApi | POST | `/zte-studio-iaab-kbase/api/v1/kbase/sec-policy/multi-delete` |
| 3 | kbSecPolicyOnOffApi | POST | `/zte-studio-iaab-kbase/api/v1/kbase/sec-policy/on-off` |
| 4 | multiAddSecPolicyApi | POST | `/zte-studio-iaab-kbase/api/v1/kbase/sec-policy/multi-add` |
| 5 | getPolicyKBaseListApi | GET | `/zte-studio-iaab-kbase/api/v1/kbase/sec-policy/kbase-list/query?policyType={type}` |
| 6 | getPolicyKBaseDetailApi | GET | `/zte-studio-iaab-kbase/api/v1/kbase/sec-policy/query?policyId={id}` |
| 7 | kbSecPolicyEditApi | POST | `/zte-studio-iaab-kbase/api/v1/kbase/sec-policy/edit` |
| 8 | getDisableImportApi | GET | `/zte-studio-iaab-kbase/api/v1/kbase/check-kbase/prohibit/disable-import?kbaseId={kbaseId}` |

---

## 11. kbaseApi.js — 知识库文件上传 & 代码知识库

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | uploadFilePreCheckApi | POST | `/zte-studio-iaab-uploadmanager/api/v1/file/uploadFilePreCheck?kbaseId={kbaseId}` |
| 2 | getSupportOperatorApi | POST | `/zte-studio-iaab-kbase/api/v1/operator/support` |
| 3 | uploadFileAndSplitConfigApi | POST | `/zte-studio-iaab-uploadmanager/api/v1/file/upload?kbaseId={kbaseId}` |
| 4 | getFileSizeInfoApi | GET | `/zte-studio-iaab-uploadmanager/api/v1/file/size_limit` |
| 5 | getPreviewInfoApi | POST | `/zte-studio-iaab-uploadmanager/api/v1/file/filePreview?kbaseId={kbaseId}` |
| 6 | downSplitContentApi | POST | `/zte-studio-iaab-uploadmanager/api/v1/file/downloadCleanFile?kbaseId={kbaseId}` |
| 7 | externalContentDownSplitContentApi | POST | `/zte-studio-iaab-uploadmanager/api/v1/file/externalContent/downloadCleanFile?kbaseId={kbaseId}` |
| 8 | judgeEmptyApi | GET | `/zte-studio-iaab-kbase/api/v1/kbase/judgeEmpty/{kbaseId}` |
| 9 | addRepoConfigApi | POST | `/zte-studio-iaab-kbase/api/v1/code-kbase/config?kbaseId={kbaseId}` |
| 10 | editRepoConfigApi | POST | `/zte-studio-iaab-kbase/api/v1/code-kbase/config/{id}` |
| 11 | getRepoConfigApi | POST | `/zte-studio-iaab-kbase/api/v1/code-kbase/config/search?kbaseId={kbaseId}` |
| 12 | getSingleRepoConfigApi | GET | `/zte-studio-iaab-kbase/api/v1/code-kbase/config/{id}` |
| 13 | delRepoConfigApi | POST | `/zte-studio-iaab-kbase/api/v1/code-kbase/config/{id}/delete?kbaseId={kbaseId}` |
| 14 | syncRepoConfigApi | POST | `/zte-studio-iaab-kbase/api/v1/code-kbase/sync/{id}?kbaseId={kbaseId}` |
| 15 | getOperatorApi | POST | `/zte-studio-iaab-kbase/api/v1/dataset/algorithm_operator/query` |
| 16 | getTenantApi | GET | `/zte-studio-iaab-kbase/api/v1/dataset/data-source/gerrit/tenants` |
| 17 | getRepoListApi | POST | `/zte-studio-iaab-kbase/api/v1/dataset/data-source/available-white/gerrit/repos` |
| 18 | getBranchListApi | POST | `/zte-studio-iaab-kbase/api/v1/dataset/data-source/gerrit/branches` |
| 19 | getOperatorDetailApi | GET | `/zte-studio-iaab-kbase/api/v1/dataset/algorithm_operator/{operatorId}` |

---

## 12. knowledgeBase.js — 知识库核心接口

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | getKnowledgeBaseList | GET | `/zte-studio-iaab-kbase/api/v1/kbase` |
| 2 | createKnowledgeBase | POST | `/zte-studio-iaab-kbase/api/v1/kbase` |
| 3 | getBusinessListApi | GET | `/zte-studio-ai-platform/api/v1/sys?section=AppConfig&subsection=category` |
| 4 | getWorkspaceProductListApi | POST | `/zte-studio-ai-platform/api/v1/workspace/getProductList` |
| 5 | getWorkspaceProjectListApi | POST | `/zte-studio-ai-platform/api/v1/workspace/getProjectList` |
| 6 | deleteKnowledgeBase | POST | `/zte-studio-iaab-kbase/api/v1/kbase/{id}/delete` |
| 7 | fileDeleteMultiApi | POST | `/zte-studio-iaab-kbase/api/v1/file/delete-multi/?kbaseId={kbaseId}` |
| 8 | deleteCodeKnowledgeBase | POST | `/zte-studio-iaab-kbase/api/v1/code-kbase/{id}/delete` |
| 9 | getKnowledgeBaseInfo | GET | `/zte-studio-iaab-kbase/api/v1/kbase/{id}` |
| 10 | getKnowledgeBaseRateApi | GET | `/zte-studio-iaab-kbase/api/v1/kbase/spaceUsageRate/{id}` |
| 11 | updatedKnowledgeBaseInfo | POST | `/zte-studio-iaab-kbase/api/v1/kbase/{id}` |
| 12 | getKnowledgeModelList | GET | `/zte-studio-iaab-kbase/api/v1/embedding/all` |
| 13 | getDatasetList | GET | `/zte-studio-iaab-kbase/api/v1/chunk` |
| 14 | deleteDataset | DELETE | `/zte-studio-iaab-kbase/api/v1/chunk/{datasetId}?kbaseId={kbId}` |
| 15 | deleteDatasetUnOtaf | POST | `/zte-studio-iaab-kbase/api/v1/chunk/{datasetId}/delete?kbaseId={kbId}&fileId={fileId}` |
| 16 | updateDataset | POST | `/zte-studio-iaab-kbase/api/v1/chunk/{datasetId}?kbaseId={kbId}` |
| 17 | searchData | POST | `/zte-studio-iaab-kbase/api/v1/retrieve` |
| 18 | getSystemConfigProps | GET | `/zte-studio-ai-platform/api/v1/sys?section={section}&id={id}&subsection={subsection}` |
| 19 | chat | POST | `/zte-studio-ai-platform/api/v1/app/{id}/chat` |
| 20 | externalContentApi | POST | `/zte-studio-iaab-uploadmanager/api/v1/file/externalContent/file?kbaseId={kbaseId}` |
| 21 | getFileContentApi | GET | `/zte-studio-iaab-uploadmanager/api/v1/file/externalContent/{kbaseId}/file` |
| 22 | uploadApi | POST | （动态传入 URL） |
| 23 | queryFilesByTypeApi | GET | `/zte-studio-iaab-kbase/api/v1/directory/queryFilesByType` |
| 24 | segmentPreviewApi | POST | `/zte-studio-iaab-uploadmanager/api/v1/file/externalContent/filePreview?kbaseId={kbaseId}` |
| 25 | externalContentPrecheckApi | POST | `/zte-studio-iaab-uploadmanager/api/v1/file/externalContent/precheck?kbaseId={kbaseId}` |
| 26 | kbGetNameByIdApi | POST | `/zte-studio-iaab-kbase/api/v1/directory/getNameById` |
| 27 | searchDirectoryApi | POST | `/zte-studio-iaab-kbase/api/v1/directory/search` |
| 28 | getTaskListApi | POST | `/zte-studio-iaab-kbase/api/v1/kbase/task/list?kbaseId={kbaseId}` |
| 29 | getAssetTaskList | POST | `/zte-studio-iaab-kbase/api/v1/asset` |
| 30 | switchTaskEnabledApi | POST | `/zte-studio-iaab-kbase/api/v1/kbase/task/switch?kbaseId={kbaseId}` |
| 31 | deleteTaskApi | POST | `/zte-studio-iaab-kbase/api/v1/kbase/task/delete/{id}?kbaseId={kbaseId}` |
| 32 | getTaskDetailApi | GET | `/zte-studio-iaab-kbase/api/v1/kbase/task/detail/{id}` |
| 33 | executeTaskApi | GET | `/zte-studio-iaab-kbase/api/v1/kbase/task/execute/{id}` |
| 34 | createTaskApi | POST | `/zte-studio-iaab-kbase/api/v1/kbase/task/create?kbaseId={kbaseId}` |
| 35 | createTaskPreCheckApi | POST | `/zte-studio-iaab-kbase/api/v1/kbase/task/createTaskPreCheck?kbaseId={kbaseId}` |
| 36 | updateTaskApi | POST | `/zte-studio-iaab-kbase/api/v1/kbase/task/update?kbaseId={kbaseId}` |
| 37 | updateTaskPreCheckApi | POST | `/zte-studio-iaab-kbase/api/v1/kbase/task/updateTaskPreCheck?kbaseId={kbaseId}` |
| 38 | taskPermissionCheckApi | GET | `/zte-studio-iaab-kbase/api/v1/kbase/task/task-permission-check` |
| 39 | fileCountPrecheckApi | GET | `/zte-studio-iaab-uploadmanager/api/v1/file/externalContent/fileCountPrecheck` |
| 40 | getFileDatasetApi | POST | `/zte-studio-iaab-kbase/api/v1/chunk/file/{fileId}?kbaseId={kbaseId}` |
| 41 | queryZaeTaskListApi | POST | `/zte-studio-iaab-kbase/api/v1/zaetask/queryTaskList` |
| 42 | createZaeTaskApi | POST | `/zte-studio-iaab-kbase/api/v1/zaetask/create` |
| 43 | updateZaeTaskApi | POST | `/zte-studio-iaab-kbase/api/v1/zaetask/updateTask/{taskId}` |
| 44 | deleteZaeTaskApi | DELETE | `/zte-studio-iaab-kbase/api/v1/zaetask/deleteTask/{taskId}` |
| 45 | checkZaeTaskInfoApi | POST | `/zte-studio-iaab-kbase/api/v1/zaetask/checkTaskInfo` |
| 46 | executeZaeTaskApi | GET | `/zte-studio-iaab-kbase/api/v1/zaetask/executeZaeTask/{taskId}` |
| 47 | getZaeResultApi | POST | `/zte-studio-iaab-kbase/api/v1/zaetask/getZaeResultFile/{taskId}` |
| 48 | getGeneratedFileApi | GET | `/zte-studio-iaab-kbase/api/v1/zaetask/getGeneratedFile/{taskId}` |
| 49 | getZaeResultOut | GET | `/zte-studio-iaab-kbase/api/v1/zaetask/getZaeResultFile/{taskId}` |
| 50 | getZaeTaskDetailApi | GET | `/zte-studio-iaab-kbase/api/v1/zaetask/queryTaskDetail/{taskId}` |
| 51 | getLlmOptionsApi | GET | `/zte-studio-iaab-kbase/api/v1/zaetask/getLlmList` |
| 52 | getWorkflowOptionsApi | GET | `/zte-studio-iaab-kbase/api/v1/zaetask/getWorkflowList` |
| 53 | exportKnowledgeBaseInfoApi | GET | `/zte-studio-iaab-kbase/api/v1/kbase/dump` |
| 54 | createAsset | POST | `/zte-studio-iaab-kbase/api/v1/asset/{kbaseId}` |
| 55 | publishAsset | POST | `/zte-studio-iaab-kbase/api/v1/asset/publish/{packageId}` |
| 56 | deleteAsset | DELETE | `/zte-studio-iaab-kbase/api/v1/asset/{packageId}` |
| 57 | getAssetStatus | GET | `/zte-studio-iaab-kbase/api/v1/asset/menu/{kbaseId}` |
| 58 | downloadAsset | GET | `/zte-studio-iaab-kbase/api/v1/asset/download/{packageId}` |
| 59 | switchFileEnabledApi | POST | `/zte-studio-iaab-kbase/api/v1/file/effect?kbaseId={kbaseId}` |
| 60 | switchChunkEnabledApi | POST | `/zte-studio-iaab-kbase/api/v1/chunk/effect?kbaseId={kbaseId}` |
| 61 | renameFileApi | POST | `/zte-studio-iaab-kbase/api/v1/file/{id}?kbaseId={kbaseId}` |
| 62 | getEvaluationTemplateApi | GET | `/zte-studio-iaab-kbase/api/v1/zaetask/evaluation/data/template` |
| 63 | getKbaseListByPkId | POST | `/zte-studio-iaab-kbase/api/v1/kbase/list/pk/id` |
| 64 | getFileDetailApi | GET | `/zte-studio-iaab-kbase/api/v1/directory/{id}` |
| 65 | kbaseListApi | POST | `/zte-studio-iaab-kbase/api/v1/kbase/search` |
| 66 | kbaseChunkLimitApi | POST | `/zte-studio-iaab-kbase/api/v1/kbase/chunkLimit` |
| 67 | kbaseChunkLimitListApi | GET | `/zte-studio-iaab-kbase/api/v1/kbase/chunkLimit` |
| 68 | getGeneratedFile | GET | `/zte-studio-iaab-kbase/api/v1/zaetask/getGeneratedFile/{taskId}` |
| 69 | getZaeResultFile | POST | `/zte-studio-iaab-kbase/api/v1/zaetask/getZaeResultFile/{taskId}` |
| 70 | getQATemplateApi | GET | `/zte-studio-iaab-kbase/api/v1/file/template` |
| 71 | getFileDetailInfoApi | GET | `/zte-studio-iaab-kbase/api/v1/file/{fileId}` |
| 72 | createQA | POST | `/zte-studio-iaab-kbase/api/v1/qa?kbaseId={kbId}` |
| 73 | updateQA | POST | `/zte-studio-iaab-kbase/api/v1/qa/{id}/update?kbaseId={kbId}` |
| 74 | getQADetail | GET | `/zte-studio-iaab-kbase/api/v1/qa/{id}?kbaseId={kbId}` |
| 75 | importQA | POST | `/zte-studio-iaab-uploadmanager/api/v1/qa/file?kbaseId={kbId}` |
| 76 | deleteQA | POST | `/zte-studio-iaab-kbase/api/v1/qa/batchDelete?kbaseId={kbId}` |
| 77 | getTaskDetailV2Api | GET | `/zte-studio-iaab-kbase/api/v1/kbase/task/detail/v2/{id}` |
| 78 | updateTaskV2Api | POST | `/zte-studio-iaab-kbase/api/v1/kbase/task/update/v2?kbaseId={kbaseId}` |
| 79 | getTaskByDirIdApi | POST | `/zte-studio-iaab-kbase/api/v1/dataset-task/dir?kbaseId={kbaseId}` |
| 80 | getSyncTaskDetailApi | GET | `/zte-studio-iaab-kbase/api/v1/dataset-task/query-task-detail` |
| 81 | getSyncTaskInfoApi | GET | `/zte-studio-iaab-kbase/api/v1/dataset-task/query-task-info` |
| 82 | getDatasetInfoApi | POST | `/zte-studio-iaab-kbase/api/v1/dataset-task/dataset_info/query` |
| 83 | getDatasetVersionApi | POST | `/zte-studio-iaab-kbase/api/v1/dataset-task/dataset_version/list?datasetId={datasetId}` |
| 84 | createSyncTaskApi | POST | `/zte-studio-iaab-kbase/api/v1/dataset-task/task/create?kbaseId={kbaseId}&directoryId={directoryId}` |
| 85 | updateSyncTaskApi | POST | `/zte-studio-iaab-kbase/api/v1/dataset-task/task/update?kbaseId={kbaseId}` |
| 86 | getDatasetVersionDirTreeApi | POST | `/zte-studio-iaab-kbase/api/v1/dataset-task/dataset/version/dir-tree` |
| 87 | precheckSyncTaskApi | POST | `/zte-studio-iaab-kbase/api/v1/dataset-task/task/precheck?kbaseId={kbaseId}&directoryId={directoryId}` |
| 88 | executeSyncTaskApi | POST | `/zte-studio-iaab-kbase/api/v1/dataset-task/task/execute?kbaseId={kbaseId}&taskId={taskId}` |
| 89 | getSyncTaskLogApi | GET | `/zte-studio-iaab-kbase/api/v1/dataset-task/export-xlsx` |
| 90 | searchTaskDirectoryApi | POST | `/zte-studio-iaab-kbase/api/v1/directory/search` |
| 91 | palTaskPermissionCheckApi | GET | `/zte-studio-iaab-kbase/api/v1/dataset-task/whitelist/permission-check` |

---

## 13. mcpServer.js — MCP 服务管理

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | mcpQueryListApi | POST | `/zte-studio-ai-platform/api/v1/mcp/service/develop/list` |
| 2 | mcpImportApi | POST | `/zte-studio-ai-platform/api/v1/mcp/upload` |
| 3 | mcpExportApi | GET | `/zte-studio-ai-platform/api/v1/mcp/export?server_id={id}` |
| 4 | mcpServerDetailApi | GET | `/zte-studio-ai-bff/zae-apirefineservice/mcp/market/detail/query?server_id={id}` |
| 5 | mcpActiveApi | POST | `/zte-studio-ai-platform/api/v1/mcp/active-and-install` |
| 6 | mcpInactiveApi | POST | `/zte-studio-ai-platform/api/v1/mcp/uninstall-and-inactive` |
| 7 | mcpDeleteApi | POST | `/zte-studio-ai-platform/api/v1/mcp/delete` |
| 8 | mcpMarketList | POST | `/zte-studio-ai-bff/zae-apirefineservice/mcp/market/query` |
| 9 | downloadMcpTemplateApi | GET | `/zte-studio-ai-platform/api/v1/download/{name}` |
| 10 | mcpServerCallApi | POST | `/zte-studio-ai-bff/nae-mcpserver/server/call` |
| 11 | mcpMarketCardIcon | GET | `/zte-studio-ai-bff/zae-apirefineservice/mcp/market/image/{id}` |
| 12 | mcpMarketDetail | GET | `/zte-studio-ai-bff/zae-apirefineservice/mcp/market/detail/query?server_id={id}` |
| 13 | mcpServerPublish | POST | `/zte-studio-ai-bff/zae-apirefineservice/mcp/market/release` |
| 14 | mcpServerRemove | POST | `/zte-studio-ai-bff/zae-apirefineservice/mcp/market/inactive` |

---

## 14. nebulaKnowledgeBase.js — 向量知识库

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | getModelList | GET | `/zte-studio-iaab-kbase/api/v1/embedding/all` |
| 2 | getKBListWithModelApi | GET | `/zte-studio-iaab-kbase/api/v1/kbase/list/{modelId}` |
| 3 | getAllKBList | POST | `/zte-studio-ai-bff/aab-workflow/api/aab-workflow/v1/workflow/allStatusKbase` |

---

## 15. operator.js — 算子管理

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | createOperatorApi | POST | `/zte-studio-iaab-kbase/api/v1/operator/import` |
| 2 | exportOperatorApi | GET | `/zte-studio-iaab-kbase/api/v1/operator/export/{operatorId}` |
| 3 | deleteOperatorApi | DELETE | `/zte-studio-iaab-kbase/api/v1/operator/{operatorId}` |
| 4 | publishOperatorApi | PUT | `/zte-studio-iaab-kbase/api/v1/operator/publish/{operatorId}` |
| 5 | unPublishOperatorApi | PUT | `/zte-studio-iaab-kbase/api/v1/operator/un_publish/{operatorId}` |
| 6 | publicOperatorApi | PUT | `/zte-studio-iaab-kbase/api/v1/operator/public/{operatorId}` |
| 7 | unPublicOperatorApi | PUT | `/zte-studio-iaab-kbase/api/v1/operator/un_public/{operatorId}` |
| 8 | getOperatorTypeApi | GET | `/zte-studio-iaab-kbase/api/v1/operator/types` |
| 9 | queryOperatorListApi | POST | `/zte-studio-iaab-kbase/api/v1/operator` |
| 10 | exportOperatorTemplateApi | GET | `/zte-studio-iaab-kbase/api/v1/operator/template/download` |

---

## 16. plugin.js — 插件管理

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | getMyPluginList | POST | `/zte-studio-ai-platform/api/v1/plugin/list` |
| 2 | getAppMyPluginList | POST | `/zte-studio-ai-platform/api/v1/plugin/list/app/{appId}/my` |
| 3 | getAllPluginList | POST | `/zte-studio-ai-platform/api/v1/plugin/list/all` |
| 4 | getAppAllPluginList | POST | `/zte-studio-ai-platform/api/v1/plugin/list/app/{appId}/all` |
| 5 | getAppUnauthPluginList | POST | `/zte-studio-ai-platform/api/v1/plugin/list/app/{appId}/unAuth` |
| 6 | getAppUsedPluginList | POST | `/zte-studio-ai-platform/api/v1/plugin/list/app/{appId}/used` |
| 7 | authenticatePluginApi | POST | `/zte-studio-ai-platform/api/v1/plugin/app/{appId}/auth` |
| 8 | getPluginAuthInfo | GET | `/zte-studio-ai-platform/api/v1/plugin/app/{appId}/auth/{pluginCode}` |
| 9 | cancelAuthPlugin | POST | `/zte-studio-ai-platform/api/v1/plugin/app/{appId}/auth/delete/{pluginCode}` |
| 10 | createPlugin | POST | `/zte-studio-ai-platform/api/v1/plugin/create` |
| 11 | deletePlugin | POST | `/zte-studio-ai-platform/api/v1/plugin/delete/{id}` |
| 12 | updatePluginBasicInfo | POST | `/zte-studio-ai-platform/api/v1/plugin/update/{id}` |
| 13 | updatePluginAuthInfo | POST | `/zte-studio-ai-platform/api/v1/plugin/auth/update/{id}` |
| 14 | updatePluginApiInfo | POST | `/zte-studio-ai-platform/api/v1/plugin/api/update/{id}` |
| 15 | getPluginRelatedAppList | GET | `/zte-studio-ai-platform/api/v1/plugin/associatedApp/list?id={id}&currentPage={currentPage}&pageSize={pageSize}&appName={appName}` |
| 16 | getPluginsDetailByIds | POST | `/zte-studio-ai-platform/api/v1/plugin/list/ids` |
| 17 | getPluginsAuthDetailByIds | POST | `/zte-studio-ai-platform/api/v1/plugin/list/app/{appID}/ids` |
| 18 | getValidPluginApi | POST | `/zte-studio-ai-platform/api/v1/plugin/list/app/{appID}/other` |

---

## 17. prompt.js — 提示词管理

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | createPrompt | POST | `/zte-studio-ai-prompt/api/v1/prompt` |
| 2 | updatePrompt | POST | `/zte-studio-ai-prompt/api/v1/prompt/put/{id}` |
| 3 | deletePromptApi | POST | `/zte-studio-ai-prompt/api/v1/prompt/delete/{id}` |
| 4 | createStarredPrompt | POST | `/zte-studio-ai-prompt/api/v1/prompt/starred` |
| 5 | cancelStarredPrompt | POST | `/zte-studio-ai-prompt/api/v1/prompt/starred/delete/{id}` |
| 6 | getSystemConfigProps | GET | `/zte-studio-ai-platform/api/v1/sys?section={section}&id={id}&subsection={subsection}` |
| 7 | getPromptTagApi | GET | `/zte-studio-ai-prompt/api/v1/prompt/tags` |
| 8 | pageQueryPromptApi | POST | `/zte-studio-ai-prompt/api/v1/prompt/page-query` |
| 9 | detailQueryPromptApi | GET | `/zte-studio-ai-prompt/api/v1/prompt/{id}` |
| 10 | createPromptThumbUpRecord | POST | `/zte-studio-ai-prompt/api/v1/prompt/thumbUp` |
| 11 | cancelPromptThumbRecord | POST | `/zte-studio-ai-prompt/api/v1/prompt/thumbUp/delete/{id}` |

---

## 18. setting.js — 系统设置 & 模型管理

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | getManageAppList | POST | `/zte-studio-ai-platform/api/v1/manage/app/publish/list` |
| 2 | getAppOperationLog | POST | `/zte-studio-ai-platform/api/v1/manage/app/operate/detail` |
| 3 | cancelAppPublish | POST | `/zte-studio-ai-platform/api/v1/app/version/{appId}/cancel` |
| 4 | cancelManageAppPublish | POST | `/zte-studio-ai-platform/api/v1/manage/app/{appId}/cancel` |
| 5 | opensourceDownloadApi | GET | `/zte-studio-ai-platform/api/v1/opensource/download` |
| 6 | getBasicCreationLimit | GET | `/zte-studio-ai-platform/api/v1/sys/systemCreationLimit` |
| 7 | getBasicKBStatus | GET | `/zte-studio-ai-platform/api/v1/sys/getSystemConfig?section={section}&subsection={subsection}` |
| 8 | modifyBasicCreationLimit | POST | `/zte-studio-ai-platform/api/v1/sys/systemCreationLimit` |
| 9 | modifyBasicKBStatus | POST | `/zte-studio-ai-platform/api/v1/sys/updateSystemConfig` |
| 10 | getThrottlingConfig | GET | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/rateLimitConfig?currentPage={}&pageSize={}&rateLimitKey={}&bizAppId={}` |
| 11 | configThrottling | POST | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/rateLimitConfig` |
| 12 | deleteThrottling | POST | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/rateLimitConfig/delete?id={id}` |
| 13 | getModelValueList | GET | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/model` |
| 14 | getModelVersionListApi | GET | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/model/version?currentPage={}&pageSize={}&modelValue={}` |
| 15 | addVersion | POST | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/model/version` |
| 16 | getModelPoolListApi | GET | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/model/pool?currentPage={}&pageSize={}&modelValue={}` |
| 17 | configModelPoolApi | POST | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/model/pool` |
| 18 | getModelInstanceListApi | GET | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/model/pool/instance?modelPoolId={modelPoolId}` |
| 19 | deleteModelInstanceApi | POST | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/model/pool/instance/delete?instanceId={}&poolId={}` |
| 20 | configModelInstanceApi | POST | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/model/pool/instance` |
| 21 | addAppStrategyListApi | POST | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/gray/addOrUpdateAppStrategy` |
| 22 | getAppStrategyListApi | GET | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/gray/listAppStrategy` |
| 23 | delAppStrategyApi | POST | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/gray/removeAppStrategy` |
| 24 | getModelValueApi | GET | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/model` |
| 25 | getModelPoolApi | GET | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/model/pool` |
| 26 | getModelStrategyListApi | GET | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/gray/listModelStrategy` |
| 27 | addModelStrategyListApi | POST | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/gray/addModelStrategy` |
| 28 | delModelStrategyApi | POST | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/gray/removeModelStrategy` |
| 29 | addModelApi | POST | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/model` |
| 30 | getModelApi | GET | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/model/page` |
| 31 | deleteModelApi | POST | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/model/{modelId}/delete` |
| 32 | getModelVersionApi | GET | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/model/version` |
| 33 | getWhiteListApi | GET | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/permission/whitelist` |
| 34 | delWhiteListApi | POST | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/permission/whitelist/delete` |
| 35 | addAppWhiteListApi | POST | `/zte-studio-ai-platform/proxy/aiserver/api/v1/sys/permission/whitelist` |
| 36 | getReleaseNoteApi | GET | `/zte-studio-ai-platform/api/v1/releaseNote` |
| 37 | updateReleaseNoteApi | POST | `/zte-studio-ai-platform/api/v1/releaseNote` |
| 38 | getPublicConfig | GET | `/zte-studio-ai-platform/api/v1/sys/getPublicConfig` |
| 39 | addSystemConfigApi | POST | `/zte-studio-ai-platform/api/v1/sys/addSystemConfig` |
| 40 | updateSystemConfigApi | POST | `/zte-studio-ai-platform/api/v1/sys/updateSystemConfigById` |
| 41 | checkFeatureAccessApi | GET | `/zte-studio-ai-platform/api/v1/sys/checkFeatureAccess?section={section}&subsection={subsection}` |

---

## 19. skill.js — 技能管理

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | getSkillTableListApi | GET | `/zte-studio-ai-bff/zae-apirefineservice/skill/query?limit_num=10000` |
| 2 | exportSkillApi | GET | `/zte-studio-ai-bff/zae-apirefineservice/skill/export?skill_id={skill_id}` |
| 3 | deleteSkillApi | DELETE | `/zte-studio-ai-bff/zae-apirefineservice/skill/delete?skill_id={skill_id}` |
| 4 | generateSkillApi | POST | `/zte-studio-ai-bff/zae-apirefineservice/skill/generate` |
| 5 | createSkillApi | POST | `/zte-studio-ai-bff/zae-apirefineservice/skill/create` |
| 6 | editSkillApi | POST | `/zte-studio-ai-bff/zae-apirefineservice/skill/modify` |
| 7 | getModelsApi | GET | `/zte-studio-ai-bff/zae-apirefineservice/models/llm/query` |
| 8 | getLpiListApi | GET | `/zte-studio-ai-bff/zae-apirefineservice/lpi/query?limit_num=10000` |
| 9 | getSkillDetailApi | GET | `/zte-studio-ai-bff/zae-apirefineservice/skill/detail/query?skill_id={skill_id}` |
| 10 | exportLpiApi | GET | `/zte-studio-ai-bff/zae-apirefineservice/lpi/export` |
| 11 | getLpiDetailApi | GET | `/zte-studio-ai-bff/zae-apirefineservice/lpi/detail/query` |
| 12 | generateLpiApi | POST | `/zte-studio-ai-bff/zae-apirefineservice/v2/lpi/generate` |
| 13 | modifyLpiApi | POST | `/zte-studio-ai-bff/zae-apirefineservice/lpi/modify` |
| 14 | createLpiApi | POST | `/zte-studio-ai-bff/zae-apirefineservice/v2/lpi/create` |
| 15 | deleteLpiApi | DELETE | `/zte-studio-ai-bff/zae-apirefineservice/lpi/delete` |
| 16 | uploadFileApi | POST | `/zte-studio-ai-bff/zae-apirefineservice/_upload?file_type={file_type}` |
| 17 | importSkillApi | POST | `/zte-studio-ai-bff/zae-apirefineservice/skill/import` |
| 18 | importLpiApi | POST | `/zte-studio-ai-bff/zae-apirefineservice/lpi/import` |

---

## 20. square.js — 广场 & 产品上架 & AI 应用登记

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | getApplistApi | POST | `/zte-studio-iaab-kbase/api/v1/operator/import` |
| 2 | getApprovalListApi | GET | `/zte-studio-ai-platform/api/v1/personalCenter/approval/list?currentPage={}&pageSize={}` |
| 3 | getApprovalDetailApi | GET | `/zte-studio-ai-platform/api/v1/personalCenter/detail/{id}` |
| 4 | getAllOrMyListingsListApi | POST | `/zte-studio-ai-platform/api/v1/personalCenter/productApproval` |
| 5 | changeProductLevelApi | POST | `/zte-studio-ai-platform/api/v1/product/{id}/changeLevel?level={level}` |
| 6 | offshelfProductApi | POST | `/zte-studio-ai-platform/api/v1/product/{id}/shelf/off` |
| 7 | deleteProductApi | POST | `/zte-studio-ai-platform/api/v1/product/delete/{id}` |
| 8 | approveApi | POST | `/zte-studio-ai-platform/api/v1/personalCenter/approval/submit` |
| 9 | downloadTemplateApi | GET | `/zte-studio-ai-platform/api/v1/product/fileTemplate?type={type}` |
| 10 | listingProductionApi | POST | `/zte-studio-ai-platform/api/v1/product/listing` |
| 11 | getListingListApi | POST | `/zte-studio-ai-platform/api/v1/product/listing/list` |
| 12 | createRegistrationApi | POST | `/zte-studio-ai-platform/api/v1/ai-app-registration/create` |
| 13 | updateRegistrationApi | POST | `/zte-studio-ai-platform/api/v1/ai-app-registration/update` |
| 14 | deleteRegistrationApi | POST | `/zte-studio-ai-platform/api/v1/ai-app-registration/delete?id={id}` |
| 15 | getRegistrationDetailApi | POST | `/zte-studio-ai-platform/api/v1/ai-app-registration/detail?id={id}` |
| 16 | getRelatedAgentApi | POST | `/zte-studio-ai-platform/api/v1/ai-app-registration/associated-agents?uacAppId={id}&currentPage={}&pageSize={}` |
| 17 | validateRegistrationNameApi | POST | `/zte-studio-ai-platform/api/v1/ai-app-registration/validate/name` |
| 18 | validateRegistrationUacAppApi | POST | `/zte-studio-ai-platform/api/v1/ai-app-registration/validate/uac-app` |
| 19 | getRegistrationListApi | POST | `/zte-studio-ai-platform/api/v1/ai-app-registration/query` |
| 20 | exportRegistrationListApi | POST | `/zte-studio-ai-platform/api/v1/ai-app-registration/export` |
| 21 | uploadRegistrationApi | POST | `/zte-studio-ai-platform/api/v1/ai-app-registration/document/upload` |
| 22 | downloadRegistrationDocApi | POST | `/zte-studio-ai-platform/api/v1/ai-app-registration/document/download?registrationId={id}` |
| 23 | getTagListApi | POST | `/zte-studio-ai-platform/api/v1/tag/search` |
| 24 | getAssetListApi | GET | `/zte-studio-ai-platform/api/v1/product/assetList` |
| 25 | connectionTestApi | POST | `/zte-studio-ai-platform/api/v1/product/connection` |
| 26 | getProductDetailApi | GET | `/zte-studio-ai-platform/api/v1/product/listing/{id}` |
| 27 | downloadDocApi | POST | `/zte-studio-ai-platform/api/v1/product/{id}/download-docs` |
| 28 | getAgentCardApi | GET | `/zte-studio-ai-platform/api/v1/a2a/inner/listing/{assetId}/.well-known/agent.json` |
| 29 | subscribeProductApi | POST | `/zte-studio-ai-platform/api/v1/product/subscribe` |
| 30 | workspaceSubscribeApi | POST | `/zte-studio-ai-platform/api/v1/workspace/subscribe` |
| 31 | productUnsubscribeApi | POST | `/zte-studio-ai-platform/api/v1/product/unsubscribe` |
| 32 | querySubscribedAssetApi | POST | `/zte-studio-ai-platform/api/v1/asset/query_subscribed_asset` |
| 33 | queryHostedSubscribedAssetApi | POST | `/zte-studio-ai-platform/api/v1/asset/query_subscribed_asset_dropdown` |
| 34 | getListingSummaryApi | POST | `/zte-studio-ai-platform/api/v1/product/listing/summary` |
| 35 | getDomainListApi | GET | `/zte-studio-ai-platform/api/v1/product/catalog/tree` |
| 36 | getReceiveUnitListApi | POST | `/zte-studio-ai-platform/api/v1/product/department/selectReceiveUnit` |

---

## 21. tag.js — 标签管理

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | createTagApi | POST | `/zte-studio-iaab-kbase/api/v1/tags?kbaseId={kbaseId}` |
| 2 | updateTagApi | POST | `/zte-studio-iaab-kbase/api/v1/tags/{tagId}?kbaseId={kbaseId}` |
| 3 | deleteTagApi | POST | `/zte-studio-iaab-kbase/api/v1/tags/delete?kbaseId={kbaseId}` |
| 4 | queryTagsApi | POST | `/zte-studio-iaab-kbase/api/v1/tags/list` |
| 5 | unbindTagFromFileApi | POST | `/zte-studio-iaab-kbase/api/v1/tags/unbind?kbaseId={kbaseId}&fileId={fileId}&tagId={tagId}` |
| 6 | queryFilePageByTagIdApi | POST | `/zte-studio-iaab-kbase/api/v1/directory/{tagId}/page?kbaseId={kbaseId}` |
| 7 | bindTagsToFileApi | POST | `/zte-studio-iaab-kbase/api/v1/tags/file/bind?kbaseId={kbaseId}` |
| 8 | bindTagToFilesApi | POST | `/zte-studio-iaab-kbase/api/v1/tags/files/bind?kbaseId={kbaseId}` |
| 9 | queryTagsByFileIdApi | GET | `/zte-studio-iaab-kbase/api/v1/tags/{fileId}?kbaseId={kbaseId}` |
| 10 | queryTagsByFolderIdApi | GET | `/zte-studio-iaab-kbase/api/v1/tags/folder/{folderId}?kbaseId={kbaseId}` |
| 11 | saveByTagNamesApi | POST | `/zte-studio-iaab-kbase/api/v1/tags/folder/saveByTagNames?kbaseId={kbaseId}&folderId={folderId}` |
| 12 | bindTagToDirectoriesApi | POST | `/zte-studio-iaab-kbase/api/v1/tags/directories/bind?kbaseId={kbaseId}` |
| 13 | descendantsWithTagApi | GET | `/zte-studio-iaab-kbase/api/v1/directory/descendantsWithTag` |
| 14 | getTagNameByTagIdApi | GET | `/zte-studio-iaab-kbase/api/v1/tags/name/{tagId}?kbaseId={kbaseId}` |

---

## 22. user.js — 用户管理

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | getCurrentUserInfo | GET | `/zte-uniwork-uportal-api/uportal/user/queryDetail` |
| 2 | getUserRolesApi | GET | `/zte-studio-ai-platform/api/v1/roles/self` |
| 3 | getCodeKBPermissionApi | GET | `/zte-studio-iaab-kbase/api/v1/code-kbase/permission-check` |
| 4 | feedbackApi | POST | `/zte-studio-ai-platform/api/v1/housekeeper/feedback` |
| 5 | getUserReleaseNoteApi | GET | `/zte-studio-ai-platform/api/v1/releaseNote/user` |
| 6 | updateUserReleaseNoteApi | POST | `/zte-studio-ai-platform/api/v1/releaseNote/user` |
| 7 | otafLogoutApi | GET | `/zte-studio-ai-platform/uac/otaf/logout` |
| 8 | signOut | GET | `/zte-studio-ai-platform/uac/logout` |

---

## 23. workflow.js — 工具 & MCP 管理

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | deleteToolApi | POST | `/zte-studio-ai-platform/api/v1/tool/delete/{id}` |
| 2 | getToolRelatedAppListApi | GET | `/zte-studio-ai-platform/api/v1/tool/associatedApp/list?id={id}&currentPage={}&pageSize={}&appName={}` |
| 3 | getToolListApi | POST | `/zte-studio-ai-platform/api/v1/tool/pageQuery?currentPage={}&pageSize={}` |
| 4 | getToolListWithRoleApi | POST | `/zte-studio-ai-platform/api/v1/tool/pageQueryTool?currentPage={}&pageSize={}` |
| 5 | publishToolApi | POST | `/zte-studio-ai-platform/api/v1/app/version/{appId}/publishApp` |
| 6 | getToolInfoApi | GET | `/zte-studio-ai-platform/api/v1/tool/configure/{id}` |
| 7 | getToolInfoByAppIdApi | GET | `/zte-studio-ai-platform/api/v1/tool/queryTool/{appId}` |
| 8 | updateToolApi | POST | `/zte-studio-ai-platform/api/v1/tool/updateTool` |
| 9 | getToolAuthApi | GET | `/zte-studio-ai-platform/api/v1/tool/checkAuth/{toolId}` |
| 10 | getMCPApi | GET | `/zte-studio-ai-platform/api/v1/mcp/pageQuery` |
| 11 | getMCPDetailApi | GET | `/zte-studio-ai-platform/api/v1/mcp/detail/query` |
| 12 | getCustomMCPListApi | POST | `/zte-studio-ai-platform/api/v1/mcp/discover-tools` |

---

## 24. workspace.js — 工作空间管理

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | createWorkspaceApi | POST | `/zte-studio-ai-platform/api/v1/workspace/create` |
| 2 | saveWorkspaceApi | POST | `/zte-studio-ai-platform/api/v1/workspace/save/{workspaceId}` |
| 3 | getWorkspaceListApi | GET | `/zte-studio-ai-platform/api/v1/workspace/list` |
| 4 | saveRecentWorkspaceApi | POST | `/zte-studio-ai-platform/api/v1/workspace/recent/save` |
| 5 | getRecentWorkspaceApi | GET | `/zte-studio-ai-platform/api/v1/workspace/recent/query` |
| 6 | getWorkspaceDetailApi | POST | `/zte-studio-ai-platform/api/v1/workspace/detail` |
| 7 | workspaceSaveOthersApi | POST | `/zte-studio-ai-platform/api/v1/workspace/saveOthers/{workspaceId}` |
| 8 | getProjectListApi | POST | `/zte-studio-ai-platform/api/v1/workspace/getProjectList` |
| 9 | getProductListApi | POST | `/zte-studio-ai-platform/api/v1/workspace/getProductList` |
| 10 | getProjectDetailApi | POST | `/zte-studio-ai-platform/api/v1/workspace/getProjectDetail` |
| 11 | getProductDetailApi | POST | `/zte-studio-ai-platform/api/v1/workspace/getProductDetail` |
| 12 | accessRoleUsersPageApi | GET | `/zte-studio-ai-platform/api/v1/roles/accessRoleUsersPage` |
| 13 | getPDMDetailApi | POST | `/zte-studio-ai-platform/api/v1/workspace/getProductDetail` |
| 14 | getPDMListApi | POST | `/zte-studio-ai-platform/api/v1/workspace/getAppList` |

---

## 25. workspace_kbase.js — 新空间知识库

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | kbaseListApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/kbase/search` |
| 2 | deleteKnowledgeBaseApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/kbase/delete/{id}` |
| 3 | createAssetApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/asset/{kbaseId}` |
| 4 | publishAssetApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/asset/publish/{packageId}` |
| 5 | deleteAssetApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/asset/delete/{packageId}` |
| 6 | getAssetStatusApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/asset/menu/{kbaseId}` |
| 7 | downloadAssetApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/asset/download/{packageId}` |
| 8 | judgeEmptyApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/kbase/judgeEmpty/{kbaseId}` |
| 9 | getModelListApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/embedding/all` |
| 10 | createKnowledgeBaseApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/kbase` |
| 11 | getKnowledgeBaseInfoApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/kbase/{id}` |
| 12 | updatedKnowledgeBaseInfoApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/kbase/{id}` |
| 13 | getAssetTaskListApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/asset` |
| 14 | searchDirectoryApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/directory/search` |
| 15 | deleteDirectoryOrFileApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/directory/delete/{id}?kbaseId={kBaseId}` |
| 16 | getDescendantsDirectoryListApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/directory/descendants` |
| 17 | createDirectoryApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/directory` |
| 18 | modifyDirectoryNameApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/directory/{id}?kbaseId={kbaseId}` |
| 19 | getFileDatasetApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/chunk/file/{fileId}` |
| 20 | deleteDatasetApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/chunk/delete/{chunkId}?kbaseId={kbId}` |
| 21 | updateDatasetApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/chunk/{datasetId}?kbaseId={kbId}` |
| 22 | switchChunkEnabledApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/chunk/effect?kbaseId={kbaseId}` |
| 23 | deleteFileApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/file/delete/{id}?kbaseId={kBaseId}` |
| 24 | downloadFileApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/file/doc/downloadFile` |
| 25 | getFileListApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/directory/search/pageFile?folderId={folderId}&kbaseId={kbaseId}` |
| 26 | uploadFileAndSplitConfigApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/file/upload?kbaseId={kbaseId}` |
| 27 | uploadFilePreCheckApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/file/uploadFilePreCheck?kbaseId={kbaseId}` |
| 28 | getFileSizeInfoApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/file/size_limit` |
| 29 | getPreviewInfoApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/file/filePreview?kbaseId={kbaseId}` |
| 30 | downSplitContentApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/file/downloadCleanFile?kbaseId={kbaseId}` |
| 31 | externalContentDownSplitContentApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/file/externalContent/downloadCleanFile?kbaseId={kbaseId}` |
| 32 | segmentPreviewApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/file/externalContent/filePreview?kbaseId={kbaseId}` |
| 33 | getSupportOperatorApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/operator/support` |
| 34 | kbGetNameByIdApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/directory/getNameById` |
| 35 | getDatasetListApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/chunk` |
| 36 | updateZaeTaskApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/zaetask/updateTask/{taskId}` |
| 37 | deleteZaeTaskApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/zaetask/deleteTask/{taskId}` |
| 38 | queryZaeTaskListApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/zaetask/queryTaskList` |
| 39 | createZaeTaskApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/zaetask/create` |
| 40 | executeZaeTaskApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/zaetask/executeZaeTask/{taskId}` |
| 41 | getZaeResultApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/zaetask/getZaeResultFile/{taskId}` |
| 42 | getLlmOptionsApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/zaetask/getLlmList` |
| 43 | getZaeTaskDetailApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/zaetask/queryTaskDetail/{taskId}` |
| 44 | getGeneratedFileApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/zaetask/getGeneratedFile/{taskId}` |
| 45 | getDatasetSizeApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/zaetask/getDatasetSize` |
| 46 | exportEvaluationTemplateApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/zaetask/evaluation/data/template/xlsx` |
| 47 | getEmbeddingOptionsApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/zaetask/getEmbeddingList` |
| 48 | getMetricsOptionsApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/zaetask/getMetrics` |
| 49 | createZaeTaskWorkflowApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/zaetask/create/workflow` |

---

## 26. workspace_model.js — 空间模型管理

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | modelRegisterListApi | POST | `/zte-studio-ai-bff/api/v1/modelmanage/model/register/list` |
| 2 | modelRegisterApi | POST | `/zte-studio-ai-bff/zae-bs-modeladapter/modelmanage/model/register` |
| 3 | modelDeleteApi | POST | `/zte-studio-ai-bff/zae-bs-modeladapter/modelmanage/model/delete` |
| 4 | chatCompletionsApi | POST | `/zte-studio-ai-bff/zae-bs-modeladapter/v2/chat/completions` |
| 5 | conpletionTestApi | POST | `/zte-studio-ai-bff/zae-bs-modeladapter/v2/completions` |
| 6 | embeddingsTestApi | POST | `/zte-studio-ai-bff/zae-bs-modeladapter/v2/embeddings` |
| 7 | rerankTestApi | POST | `/zte-studio-ai-bff/zae-bs-modeladapter/v2/rerank` |
| 8 | modelOrgListApi | GET | `/zte-studio-ai-platform/api/v1/model/orgList` |
| 9 | modelSubscribedListApi | POST | `/zte-studio-ai-platform/api/v1/model/subscribed/list` |

---

## 27. workspace_operator.js — 新空间算子管理

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | createOperatorApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/operator/import` |
| 2 | exportOperatorApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/operator/export/{operatorId}` |
| 3 | deleteOperatorApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/operator/delete/{operatorId}` |
| 4 | publishOperatorApi | PUT | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/operator/publish/{operatorId}` |
| 5 | unPublishOperatorApi | PUT | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/operator/un_publish/{operatorId}` |
| 6 | publicOperatorApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/operator/public/{operatorId}` |
| 7 | unPublicOperatorApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/operator/un_public/{operatorId}` |
| 8 | getOperatorTypeApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/operator/types` |
| 9 | queryOperatorListApi | POST | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/operator` |
| 10 | exportOperatorTemplateApi | GET | `/zte-studio-ai-bff/aab-kbase/api/aab-kbase/v1/operator/template/download` |

---

## 28. workspace_rag.js — 工作流 & RAG 编排

| # | 函数名 | 方法 | 完整 URL |
|---|-------|------|----------|
| 1 | getFlowConfig | GET | `/zte-studio-ai-bff/aab-workflow/api/aab-workflow/v1/flow?appId={appId}` |
| 2 | checkSaveFlowConfig | POST | `/zte-studio-ai-bff/aab-workflow/api/aab-workflow/v1/flow/preCheck?appId={appId}` |
| 3 | saveFlowConfig | POST | `/zte-studio-ai-bff/aab-workflow/api/aab-workflow/v1/flow?appId={appId}` |
| 4 | exportWorkFlow | POST | `/zte-studio-ai-bff/aab-workflow/api/aab-workflow/v1/flow/downloadAsset?appId={appId}` |
| 5 | getFlowList | GET | `/zte-studio-ai-bff/aab-workflow/api/aab-workflow/v1/workflow?currentPage={}&pageSize={}&name={}` |
| 6 | createFlow | POST | `/zte-studio-ai-bff/aab-workflow/api/aab-workflow/v1/workflow` |
| 7 | updateFlow | POST | `/zte-studio-ai-bff/aab-workflow/api/aab-workflow/v1/workflow/update` |
| 8 | deleteFlowApi | POST | `/zte-studio-ai-bff/aab-workflow/api/aab-workflow/v1/workflow/delete` |
| 9 | getLLMModel | GET | `/zte-studio-ai-bff/aab-workflow/api/aab-workflow/v1/workflow/app/model` |
| 10 | getCustomOperatorListApi | GET | `/zte-studio-iaab-kbase/api/v1/operator/rag_workflow/supported?format={type}` |
| 11 | getFlowKnowledgeList | GET | `/zte-studio-ai-bff/aab-workflow/api/aab-workflow/v1/flow/knowledge/info?appId={appId}` |
| 12 | publishWorkFlow | POST | `/zte-studio-ai-bff/aab-workflow/api/aab-workflow/v1/flow/publish?appId={appId}` |

---

## 统计汇总

| 模块文件 | 接口数量 |
|---------|---------|
| agent.js | 12 |
| agentApp.js | 47 |
| app.js | 52 |
| appChat.js | 11 |
| asset.js | 11 |
| codeIndex.js | 7 |
| deepwiki.js | 9 |
| directory.js | 13 |
| extendedManagement.js | 12 |
| kbSetting.js | 8 |
| kbaseApi.js | 19 |
| knowledgeBase.js | 91 |
| mcpServer.js | 14 |
| nebulaKnowledgeBase.js | 3 |
| operator.js | 10 |
| plugin.js | 18 |
| prompt.js | 11 |
| setting.js | 41 |
| skill.js | 18 |
| square.js | 36 |
| tag.js | 14 |
| user.js | 8 |
| workflow.js | 12 |
| workspace.js | 14 |
| workspace_kbase.js | 49 |
| workspace_model.js | 9 |
| workspace_operator.js | 10 |
| workspace_rag.js | 12 |
| **总计** | **~535** |

---

> 说明：
> - URL 中 `{xxx}` 表示动态路径参数或查询参数
> - 所有 URL 均基于 `.env` 文件中的环境变量解析
> - `VITE_PROMPTADAPTER_BASE` 未在 `.env` 中配置，取 vite.config.ts 中的默认值 `/api/promptadapter`
> - `VITE_PLATFORM_BASE_OTAF` 仅在 `.env.onemachine` 中配置为 `/zte-studio-ai-platform`
> - 生产环境 `VITE_PLATFORM_OPENAI_BASE` 和 `VITE_PROMPT_OPENAI_BASE` 为完整域名 URL，其余为相对路径（由反向代理或同域处理）

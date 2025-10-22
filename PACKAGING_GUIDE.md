# VSCode 插件打包指南

## 快速打包

### 一键打包
```bash
npm run package
```

这个命令会:
1. 自动运行 `vscode:prepublish` (使用 esbuild 压缩代码)
2. 生成 `.vsix` 文件

### 打包结果
- **文件名**: `open-with-selection-0.1.1.vsix`
- **文件大小**: ~25 KB
- **压缩后的代码**: `out/extension.js` (1.6 KB)

## 安装和测试

### 方法 1: 命令行安装
```bash
code --install-extension open-with-selection-0.1.1.vsix
```

### 方法 2: VSCode 界面安装
1. 打开 VSCode
2. 按 `Cmd+Shift+P` (macOS) 或 `Ctrl+Shift+P` (Windows/Linux)
3. 输入并选择 "Extensions: Install from VSIX..."
4. 选择生成的 `.vsix` 文件

### 方法 3: 拖放安装
直接将 `.vsix` 文件拖到 VSCode 窗口的扩展视图

## 发布到市场

### 首次准备
1. 访问 https://dev.azure.com 创建账号
2. 生成 Personal Access Token (PAT)
   - Organization: All accessible organizations
   - Scopes: Marketplace (Manage)
3. 登录 vsce:
```bash
vsce login <your-publisher-name>
```

### 发布命令
```bash
# 发布当前版本
npm run publish

# 或使用版本号自动升级发布
vsce publish patch  # 0.1.1 -> 0.1.2
vsce publish minor  # 0.1.1 -> 0.2.0
vsce publish major  # 0.1.1 -> 1.0.0
```

## 版本管理

### 手动更新版本号
编辑 `package.json` 中的 `version` 字段:
```json
{
  "version": "0.1.2"
}
```

### 使用 npm 更新版本
```bash
npm version patch  # 0.1.1 -> 0.1.2
npm version minor  # 0.1.1 -> 0.2.0
npm version major  # 0.1.1 -> 1.0.0
```

## 打包前检查清单

- [ ] 功能测试通过
- [ ] 更新 `CHANGELOG.md`
- [ ] 更新版本号
- [ ] 运行 `npm run esbuild` 确保编译成功
- [ ] 检查 `.vscodeignore` 配置
- [ ] 确保 `icon.png` 存在(如果配置了)
- [ ] 清理 `node_modules` 并重新安装: `npm ci`

## 常见问题

### Q: 打包失败提示缺少文件?
A: 检查 `.vscodeignore` 是否过度排除了必要文件,确保 `out/extension.js` 没有被排除。

### Q: 如何查看打包内容?
A: 运行 `vsce ls` 可以列出所有将被打包的文件。

### Q: 如何减小包体积?
A: 
- 使用 esbuild 压缩 (已配置)
- 排除开发依赖
- 移除不必要的资源文件
- 确保 `.vscodeignore` 正确配置

### Q: 打包后插件不工作?
A: 检查:
1. `package.json` 中的 `main` 字段指向正确
2. `activationEvents` 配置正确
3. 使用 F5 在开发模式下测试

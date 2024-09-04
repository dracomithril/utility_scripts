export PATH="/home/linuxbrew/.linuxbrew/bin:/home/mgrezel/.local/bin:$PATH"
eval "$(oh-my-posh init zsh --config $(brew --prefix oh-my-posh)/themes/powerlevel10k_classic.omp.json)"
export HISTFILE=~/.zsh_history
export HISTSIZE=1000
export SAVEHIST=1000
source <(fzf --zsh)
alias zshconfig='code ~/.zshrc'
alias la='ls -la'
alias ll='ls -alF'
alias user-auth="code /home/mgrezel/des-workspace/des-aem-user-auth.code-workspace"
alias user-profile="code /home/mgrezel/des-workspace/des-aem-user-profile.code-workspace"
alias checkout="code /home/mgrezel/des-workspace/des-aem-checkout.code-workspace"
alias fe-libs="code /home/mgrezel/des-workspace/frontend-libs.code-workspace"
alias jti-aem="code /home/mgrezel/des-workspace/jti-aem.code-workspace"
alias jti-next="code /home/mgrezel/des-workspace/project-eva/jti-next.code-workspace"
alias opcheckout="code /home/mgrezel/des-workspace/des-aem-op-checkout.code-workspace"
alias loy="code /home/mgrezel/des-workspace/des-aem-loyalty.code-workspace"
alias gdef="git checkout master && git pull"
alias aem-author='~/AEM-6.5/author/run.sh'
alias aem-publish='~/AEM-6.5/publish/run.sh'
alias fresh="rm -rf **/node_modules package-lock.json && npm install"
alias fix_history="/home/mgrezel/code-pit/utility_scripts/fix_zsh_history.sh"
alias fecheck="npm run felibs:check"
alias feilast="npm run felibs:install --tags=latest"
alias fei="npm run felibs:install"
alias fe-packit="npm install ~/des-workspace/frontend-libs/packs/*.tgz"
alias gitcleanup="git fetch -p ; git branch -r | awk '{print $1}' | egrep -v -f /dev/fd/0 <(git branch -vv | grep origin) | awk '{print $1}' | xargs git branch -d"

#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="$HOME/.sdkman"
[[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"

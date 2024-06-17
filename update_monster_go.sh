workspaces=(
  des-aem-checkout
  des-aem-loyalty
  des-aem-user-auth
  des-aem-user-profile
)
DES_PATH="/home/mgrezel/des-workspace"


update_repository() {
  echo "--------------------------"
  echo ""
  echo "Updating $1"
  echo ""
  git -C $DES_PATH/$1 status
  #  check if repository has no changes if it has stash them
  if [ -z "$(git -C $DES_PATH/$1 status --porcelain)" ]; then
    echo "No changes"
  else
    echo "Stashing changes"
    git -C $DES_PATH/$1 stash -u
  fi
  #  pull latest changes
  git -C $DES_PATH/$1 switch master
  git -C $DES_PATH/$1 pull


  npm --prefix $DES_PATH/$2 install
}

# iterate thru collection
for workspace in "${workspaces[@]}"
do
  update_repository $workspace $workspace/ui.core/frontend
done
update_repository frontend-libs frontend-libs
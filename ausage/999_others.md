

# ================ code share
- codeshare.io : 실행안됨,코드내용만 공유+비디오
- codesandbox.io : 실행가능(js,ts,ng...),live code 가능
- vscode : extension설치하면 가능






~defiant array는 1부터 ,전체[*]
~teradata/covalent - jsonformat,highlight,editor,markerdown,fileinput...
~material - +cdk,animation,...~dy chart update-carbonX,covalentX

# 참고
- site search . algolia.zorro
~~~ 책 - bookstack.cn - primeng,ng ...


~굿디자인 - mdbootstrap.com


# ========================================================================= git merge
    **** (최신)~ vscode에서 pull하면 conflict존재하면 merge change에 표시됨 >>> accept incomming >>> commit
# --------------------- 아래는 무시
# user/.gitconfig 또는 project/.git/config 설정
[diff]
    tool = default-difftool
[difftool "default-difftool"]
    cmd = code --wait --diff $LOCAL $REMOTE
[merge]
    tool = vscode
[mergetool "vscode"]
    cmd = code --wait $MERGED
# fetch + diff + merge	
git fetch origin
git difftool master origin/master <<< 소스비교>>>
git merge <<< MERGE CHANGES에 표시됨 - accept incoming change>>>





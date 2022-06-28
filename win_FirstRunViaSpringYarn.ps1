# powershell script - window sterminal needs to be installed
#	Save as *.ps1, edit variables so suit you
#	run script from Terminal (powershell should be v7.x) for git operations

#					CONFIG:
# Edit to select local location for repository
$LOC = "$home\Desktop"
# Edit to change remot repository
$GIT = "git@github.com:viliuskiskis/egzaminas-biblioteka-vk.git"
# Edit to change active branch
$BRANCH = "master"
# Repo name
$NAME = "egzaminas-biblioteka-vk"
# Edit to change active commit - if needed - uncomment necessary code below
#$COMMIT = "891f7fd48ee88106ed033319cf79b5eb1b2a0dd1"

Set-Location $LOC

if (Test-Path -Path $LOC'\'$NAME) {
    "repo exists in selected location"
	cd $NAME
	git switch $BRANCH
	git fetch --all
	git pull
} else {
    "cloning repo to selected location"
	git clone $GIT
	cd $NAME	
}

# if there is a problem with gui - edit endpoint.js

#Start-Process powershell -ArgumentList "-noexit", "-noprofile", "-command &{Get-Location}"

# BACKEND
	# launch separate backend terminal in location and keep it open
	wt --window 0 -d . pwsh.exe -c  {
		echo 'starting backend'
		cd back
		mvn spring-boot:run
	}
# and to wait for it to start
	# wait for backend to start - while url return status not in [200...299]

	do {
		#ensure we get a response even if an error's returned
		$response = Invoke-WebRequest -Uri http://localhost:8080 -UseBasicParsing | Select-Object -Expand StatusCode

		echo '...waiting for backend to start; resp code now is: '$response
		sleep 5
		}
	until ($response -match '2\d\d')
	
	echo '...Hooray! Backend alive'
	sleep 1

# FRONTEND
	wt --window 0 -d . pwsh.exe -c {
		echo 'starting frontend'
		cd front
		yarn install
		yarn start
	}
# prepScript:
# run as admin
     # Self-elevate the script if required
    if (-Not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] 'Administrator')) {
     if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000) {
      $CommandLine = "-File `"" + $MyInvocation.MyCommand.Path + "`" " + $MyInvocation.UnboundArguments
      Start-Process -FilePath PowerShell.exe -Verb Runas -ArgumentList $CommandLine
      Exit
     }
    }
# choco install
#	chocolatey 
			Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
#	eclipse //uncomment if needed
#			choco install eclipse-java-oxygen
#	git
			choco install git
#	openssh			
			choco install openssh
#	openjdk			
			choco install openjdk
#	maven
			choco install maven
#	yarn
			choco install yarn
#	gitkraken
			choco install gitkraken
#	windows-terminal //tabbed terminal
			choco install microsoft-windows-terminal

#	to conveniently use github	
#		generate windows ssh keys and add them (public) to your github account

choco install winmerge vscode yarn openssh openjdk eclipse git gitkraken javaruntime maven jre8 nodejs-lts h2database javaruntime ojdkbuild11


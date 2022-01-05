
// +-------------------------+
// | Hard coded variables    |
// +-------------------------+
serversMap = ["Dev": "40.123.217.231", "Prod": "40.123.209.114"]
apkFile    = "android/app/build/outputs/apk/release/app-release.apk"


// +-------------------------+
// | Pipeline Parameters     |
// +-------------------------+
properties([

    // Set the build parameters
    parameters([
        string (name: 'BRANCH_NAME', description: 'Which branch to build', defaultValue: 'master'),
        choice (name: 'ENVIRONMENT', description: 'Dev or Prod', choices: 'Dev\nProd')
    ])
])


// +-------------------------+
// | Build Parameters        |
// +-------------------------+
String prmBranchName        = params.BRANCH_NAME
String prmEnvironmentName   = params.ENVIRONMENT
String buildServerIpAddress = serversMap[prmEnvironmentName]



// +-------------------------+
// | Build Stages            |
// +-------------------------+
timestamps {
timeout(120) {
node ("Dev") {

    stage ("Init") {
        banner(env.STAGE_NAME)

        if (fileExists(apkFile)) {
            sh "mv -f ${apkFile} /tmp/"
        }
        else {
            print("No previous APK file was found.")
        }
    }



    stage("Source control") {

        banner(env.STAGE_NAME)

        checkout([
            $class: 'GitSCM',
            branches: [[name: "*/${prmBranchName}"]],
            doGenerateSubmoduleConfigurations: false,
            extensions: [[$class: 'CheckoutOption', timeout: 5],
            [$class: 'AuthorInChangelog'],
            [$class: 'LocalBranch', localBranch: prmBranchName]],
            submoduleCfg: [],
            userRemoteConfigs: [[
                credentialsId: 'ffh_user',
                url: 'git@github.com:Haverim-Larefua/haverim-larefua-app.git'
            ]]
        ])
    }



    stage("Hooks") {

        banner(env.STAGE_NAME)

        IP = serversMap[prmEnvironmentName]

        sh "sed -i -e 's/API_URL=.*/API_URL=http:\\/\\/${IP}:3001/' .env"
        sh """
            if [ -d "node_modules" ]; then
                mv node_modules deleteMe
            fi
        """
    }



    stage("Compile RN") {

        banner(env.STAGE_NAME)

        // Compile the RN code
        parallel CleanUp: {
            sh "rm -rf deleteMe"
        },
        ReactNative: {
            sh """
                export PATH=/home/ffh_user/.nvm/versions/node/v10.24.1/bin:${PATH}
                npm -version
                npm ci
            """
        },
        failFast: false
    }



    stage("Compile App") {

        banner(env.STAGE_NAME)

        // Compile the Android code
        dir ("android") {

            sh """

                export ANDROID_SDK_ROOT=/usr/lib/android-sdk
                export PATH=\${PATH}:\${ANDROID_SDK_ROOT}/tools/bin:\${ANDROID_SDK_ROOT}/cmdline-tools/tools/bin

                # Accept the Android licenses
                mkdir -p /home/ffh_user/.android
                touch /home/ffh_user/.android/repositories.cfg
                yes | sdkmanager --licenses

                ./gradlew clean assembleRelease
            """
        }
    }



    stage("Archive"){
        if (prmEnvironmentName == "Prod") {

            String prodServerIpAddress = serversMap["Prod"]

            // Copy the APK file to the prod server.
            String command = String.format(
                "scp -i /home/ffh_user/.ssh/id_rsa.prod %s ffh_user@%s:/tmp/",
                apkFile,
                prodServerIpAddress
            )
            sh "${command}"

            command =  "ssh -i /home/ffh_user/.ssh/id_rsa.prod"
            command += " ffh_user@" + prodServerIpAddress
            command += " docker cp /tmp/app-release.apk"
            command += " ffh_server:/opt/app/hl/dist/assets/downloads/FFH.apk"
            print("Command = [${command}]")
            sh "${command}"
        }
        else {
            sh "docker cp ${apkFile} ffh_server:/opt/app/hl/dist/assets/downloads/FFH.apk"
        }
    }
} // Node
} // Timeout
} // Timestamps



@NonCPS
void banner(String message) {

    if (message != null) {

        int MAX_MESSAGE_LENGTH = 100

        int messageLength = message.length();

        String dashesLine = ""

        String messageFormat

        if (messageLength <= MAX_MESSAGE_LENGTH) {

            messageFormat = '\t\t\n%s\n|     %s     |\n%s\n'

            for (int i=0 ; i<messageLength + 10 ; i++) {
                dashesLine += "-"
            }

            dashesLine = "+" + dashesLine + "+"
        }
        else {
            messageFormat = '\t\t\n%s\n|    %s\n%s\n'
            dashesLine = "+-------------"
        }

        message = String.format (messageFormat, dashesLine, message, dashesLine)
        println(message)
    }
}

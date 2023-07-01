source ./config.file
echo "${PROJECT_DIR}"
echo "${DOCKER_ID}"
echo "${PROJECT_NAME}"
echo "${IMAGES[@]}"
pods=($(kubectl get pods --no-headers -o custom-columns=":metadata.name"))
echo "${pods[@]}"

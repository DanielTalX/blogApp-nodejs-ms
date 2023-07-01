source ./config.file
for image in "${IMAGES[@]}"
do
    echo "start restart ${image}"
    cd ${PROJECT_DIR}/infra/k8s;
    kubectl rollout restart deployment ${image}-depl
    echo "end restart ${image}"
done

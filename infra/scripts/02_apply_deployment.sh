source ./config.file
for image in "${IMAGES[@]}"
do
    echo "start apply ${image}"
    cd ${PROJECT_DIR}/infra/k8s;
    kubectl apply -f ${image}-depl.yaml
    echo "end apply ${image}"
done

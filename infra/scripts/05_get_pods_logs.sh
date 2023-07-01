source ./config.file
pods=($(kubectl get pods --no-headers -o custom-columns=":metadata.name"))
all_images=$IMAGES
filter='posts'
for pod in "${pods[@]}"
do
    echo "----- ${pod} -----"
    echo "get log of ${pod}"
    kubectl logs ${pod}
    echo "end log of ${pod}"
done

source ./config.file
pods=($(kubectl get pods --no-headers -o custom-columns=":metadata.name"))
echo "get log of ${pods[@]}"
for pod in "${pods[@]}"
do
    echo "----------------------------"
    echo "------- start ${pod} -------"
    kubectl logs ${pod}
    echo "------- end ${pod} -------"
    echo "----------------------------"
    echo " "
done

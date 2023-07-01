source ./config.file
for image in "${IMAGES[@]}"
do
    echo "start delete ${image}"
    kubectl delete service ${image}-srv
    kubectl delete deployment ${image}-depl
    docker rmi $(docker images | grep 'mydockerid/blogapp')
    # docker rmi $(docker images | grep 'mydockerid')
    echo "end delete ${image}"
done

echo "services:"
kubectl get services
echo "deployment:"
kubectl get deployment
echo "pods:"
kubectl get pods
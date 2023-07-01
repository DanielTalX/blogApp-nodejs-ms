echo "---- services details: ----"
kubectl get services

echo "---- deployments details: ----"
kubectl get deployments

echo "---- pods details: ----"
kubectl get pods

echo "---- list all pods name: ----"
kubectl get pods --no-headers -o custom-columns=":metadata.name"

echo "---- list all pods name that contains bus: ----"
kubectl get pods --no-headers -o custom-columns=":metadata.name" | grep 'bus'
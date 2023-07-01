******************************
******* kubectl & pods *******
kubectl get pods
kubectl exec -it [pod_name] [cmd]
kubectl logs [pod_name]
kubectl delete pod [pod_name]
kubectl apply -f [config_file_name]
kubectl describe pod [pod_name]
------------------------------
cd project_dir/infra/k8s
kubectl get pods
kubectl apply -f posts.yaml
kubectl delete pod posts

*************************************
******* kubectl & deployments *******
kubectl get deployments
kubectl describe deployment [depl_name]
kubectl apply -f [config_file_name]
kubectl apply -f .
kubectl delete deployment [depl_name]
kubectl rollout restart deployment [depl_name]
------------------------------
kubectl get deployments
kubectl apply -f posts-depl.yaml
kubectl describe deployment posts-depl
kubectl delete pod posts-depl-7d96488949-2wmfz
kubectl delete deployment posts-depl
kubectl rollout restart deployment posts-depl

******************************************
******* kubectl & nodePort service *******
kubectl apply -f posts-srv.yaml
kubectl get services
kubectl describe service posts-srv
access from browser: http://localhost:31477/posts
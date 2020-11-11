#!/bin/bash
userReposDocker=user/repository
tag=name

clear
echo "##########################################################################################"
echo "                                  INICIO SCRIPT"
echo "##########################################################################################"
echo ""
echo ""
echo ""

echo "Deseja continuar ? (y/N):"
read proceed

case $proceed in
    n|N )
       exit
    ;;
esac

echo ""
echo ""
echo ""
echo "##########################################################################################"
echo "                           VERIFICANDO ULTIMOS 3 COMMITS"
echo "##########################################################################################"
echo ""
echo ""
echo ""
git log --pretty=oneline -3

echo ""
echo ""
echo ""
echo "##########################################################################################"
echo "                                  COMPILANDO CÓDIGO"
echo "##########################################################################################"
echo ""
echo ""
echo ""
webpack --config webpack.config.js

echo ""
echo ""
echo ""
echo "Criando arquivo package.json..."
cd scripts
node package.js
cd ..

echo ""
echo ""
echo ""
echo "##########################################################################################"
echo "                                  GERANDO IMAGEM DOCKER"
echo "##########################################################################################"
echo ""
echo ""
echo ""
docker build -t $userReposDocker:$tag .

echo ""
echo ""
echo ""
echo "Deseja rodar a imagem docker ? (y/N):"
read proceed

case $proceed in
    y|Y )

        echo ""
        echo ""
        echo ""
        echo "##########################################################################################"
        echo "                                  RODANDO IMAGEM DOCKER"
        echo "##########################################################################################"
        echo ""
        echo ""
        echo ""
        docker run -p 3000:3000 -it $userReposDocker:$tag

    ;;
esac

echo ""
echo ""
echo ""
echo "Deseja subir a imagem docker ? (y/N):"
read proceed

case $proceed in
    y|Y )

        echo ""
        echo ""
        echo ""
        echo "##########################################################################################"
        echo "                                  SUBINDO IMAGEM DOCKER"
        echo "##########################################################################################"
        echo ""
        echo ""
        echo ""
        docker push $userReposDocker:$tag

    ;;
esac

echo ""
echo ""
echo ""
echo "Aperte enter para finalizar"
read end
# evitar problema de routines error:0308010C:digital envelope routines::unsupported
FROM node:16

# pasta para onde vai o build
WORKDIR /tmp/react

# copia os arquivos para dentro da pasta WORKDIR
COPY . .

# instala as dependências do projeto
RUN npm i

#bugfix - enquanto usamos o CRA para buildar
RUN chmod a+x /tmp/react/node_modules/.bin/react-scripts 

# criamos a versão otimizada de produção
RUN npm run build

# cria todo o caminho (-p) da pasta que será servida pelo nginx
RUN mkdir -p /var/www/html

# move o conteúdo
RUN mv dist/* /var/www/html

# sai da pasta
WORKDIR /

# remove todo o diretório de desenvolvimento
RUN rm -rf /tmp/react
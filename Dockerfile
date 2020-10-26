FROM golang:alpine
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN apk update && apk add git
RUN go get github.com/gorilla/mux && go get github.com/gorilla/handlers
RUN go build server.go
CMD ["/app/server"]

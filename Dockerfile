FROM golang:alpine
RUN mkdir /app
ADD . /app
WORKDIR /app/back
RUN go mod download && go build
CMD ["/app/back/make-your-game-back"]

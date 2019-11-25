# build stage
FROM golang:1.11-alpine AS build_base

RUN apk add bash ca-certificates git gcc g++ libc-dev

ENV GO111MODULE=on

WORKDIR server

COPY ./go.mod .
COPY ./go.sum .

RUN go mod download

COPY / .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /server

# final stage
FROM scratch
COPY --from=build_base /server /cmd/app
EXPOSE 3000
ENTRYPOINT [ "/cmd/app" ]
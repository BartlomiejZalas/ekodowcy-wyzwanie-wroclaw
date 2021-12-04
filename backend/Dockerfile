FROM maven:3.6.3-jdk-11

ADD . /build
RUN cd /build \
  && mvn clean package \
  && mv target/backend-1.0-SNAPSHOT.jar /app.jar \
  && rm -rf /build

ENV JAVA_OPTS=""
ENTRYPOINT exec java $JAVA_OPTS -jar /app.jar
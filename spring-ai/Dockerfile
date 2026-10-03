# Stage 1: Build the application
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

# Copy Maven wrapper and pom.xml first for layer caching
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Fix Windows CRLF line endings if present and grant execute permission
RUN sed -i 's/\r$//' mvnw && chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B || true

# Copy source code and build the JAR
COPY src src
RUN ./mvnw clean package -DskipTests

# Stage 2: Create lightweight runtime container
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create a non-root system group and user
RUN addgroup -S spring && adduser -S spring -G spring

# Copy the built JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Set ownership
RUN chown -R spring:spring /app

USER spring

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]

---
slug: "/2020/08/14/default-http-config"
title: "Default HTTP Config Considered Dangerous"
author: richwklein
image: israel-palacio-ImcUkZ72oUs-unsplash.jpg
tags: [dns, http, microservice, dependency, config, defaults, java]
category: microservices
date: "2020-08-14"
---

An alternatively headline might be: *know how your service communicates with 
it's dependencies*. Ideally, a microservice could work in isolation without
having to communicate with any other service or dependency. This is not likely
the case and HTTP is most common way that I've seen these services 
communicating. I've witnessed several problems that have been caused by 
default configurations being used by these HTTP clients. In this article I 
will explore a couple of these issues and how you can remediate them.

#### Java DNS Caching
When the JVM resolves hostnames to ip addresses it caches those lookups. Depending
on the configuration this might not be refreshed until the JVM is restarted. This
can especially be an issue if you are using AWS services where the IP Address may
change for a service. I've seen this occurs with aurora failovers and other
scenarios. You can prevent this by setting `networkaddress.cache.ttl` in the 
`$JAVA_HOME/jre/lib/security/java.security` file to some low number of seconds. 
Amazon recommends no more than 60 seconds.

```java
networkaddress.cache.ttl=5
```

#### Maximum Connections Per Route
Creating a tcp connection between services is a time consuming process and
consumes lots of resources. This is especially true when TLS is involved.
Because of this popular http clients try and reuse the same connection if they
are going to the same route. The [OkHttp](https://square.github.io/okhttp/) 
library keeps only a single connection. The Apache 
[HttpClient](https://hc.apache.org/httpcomponents-client-ga/index.html) defaults 
to two. The default Go [http package](https://golang.org/pkg/net/http/) also 
defaults to two. 

This is fine when you are communicating over HTTP/2 because that protocol 
allows there to be multiple requests over a single connection at a time. 

Http/1.1 however, can only have a single request over the connection at a time. 
This can create a Head-of-line **(HOL)** blocking issue if you have to make 
multiple concurrent requests to the same dependency. The result of which may 
cause your services requests to back up and cause a cascading failure. The most 
basic way to mitigated this is by increasing the maximum connections per route.

```java
HttpClientBuilder builder = HttpClients.custom()
builder.setMaxConnPerRoute(20)
return builder.build()
```

#### Request Timeout
A lot of clients by default use the timeout set by the OS. This is true
for clients in both [Java](https://hc.apache.org/httpcomponents-client-ga/httpclient/apidocs/org/apache/http/client/config/RequestConfig.html#getConnectTimeout()) 
and Go. This is another possible way to cause cascading failures. The best 
advice is to configure your client with something other than the default. The
example below dies this globally for the client, but you can also set these on 
a per request basis.

```java
RequestConfig requestConfig = RequestConfig.custom()
        .setConnectTimeout(5000)
        .setSocketTimeout(5000)
        .build();
SocketConfig socketConfig = SocketConfig.custom()
        .setSoTimeout(5000)
        .build();
HttpClientBuilder builder = HttpClients.custom()
        .setMaxConnPerRoute(20)
        .setDefaultRequestConfig(requestConfig)
        .setDefaultSocketConfig(socketConfig);

return builder.build()
```

#### Other Best Practices
By following the practices above, you can help keep your service healthy. A 
few other best practices that I'm not going to go into, but can keep your 
service resilient include: using circuit breakers to prevent cascading failures,
using retry designs for those temporary intermittent failures, and using 
thread pools or executor services for bulk heading and fault isolation.

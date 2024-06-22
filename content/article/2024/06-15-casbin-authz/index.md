---
slug: 2024-06-15-casbin-authz
title: Authorization using Casbin
description: "A practical example of using Casbin to do authorization in a distributed system."
author: richwklein
featured:
  image: flyd-mT7lXZPjk7U-unsplash.jpg
  author:
    name: FlyD
    url: https://unsplash.com/@flyd2069?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
  site:
    name: Unsplash
    url: https://unsplash.com/photos/red-padlock-on-black-computer-keyboard-mT7lXZPjk7U?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
tags:
  - authorization
  - authz
  - microservice
  - distributed
  - policy
  - casbin
  - spring
  - java
category: microservices
published: "2024-06-15"
---


This article is the exploration of distributed authorization using the [Casbin](https://casbin.org) library. It is a follow up from a 2022 [article](2022-06-18-distributed-authorization) I published. In the previous article, I detailed various access control models, the parts of an authorization system, some typical patterns you see in those systems, and the pros and cons. This article is a promised follow up article showing an implementation using various libraries.

<Alert variant="outlined" severity="warning">The code and and recommendations in this article has not been tested in a real production environment.</Alert>

## System Architecture

TODO diagram using the OAuth 2.0 definitions of an resource server, authorization server, an client but include the terms from xacml including policy administration point, policy retrieval point, policy decision point, and policy enforcement point. At the end of the article give more detailed architecture recommending casbin specific components. 

## Casbin Basics

[Casbin](https://casbin.org) is an authorization library that supports modeling various types of access control mechanics, including: <abbr title="Access Control List">ACL</abbr>, <abbr title="Role Based Access Control">RBAC</abbr>, <abbr title="Attribute Based Access Control">ABAC</abbr>, and others. This library was original developed in the Go language, but has several different ports including <a href="https://github.com/casbin/jcasbin">jCasbin</a>, a java version, which we will be using in this article. 

The library works on two sets of data to determine authorization. The first piece of data is the access control model that has been defined in a <abbr title="Policy, Effect, Request, Matchers">PERM</abbr> metamodel.

### Model

The access meta model or *model* is is how you define the type of access control that will be enforce. Below is the model used to define a basic ACL.

```conf
# Request definition
[request_definition]
r = sub, obj, act

# Policy definition
[policy_definition]
p = sub, obj, act

# Policy effect
[policy_effect]
e = some(where (p.eft == allow))

# Matchers
[matchers]
m = r.sub == p.sub && r.obj == p.obj && r.act == p.act
```

The first section is the __Request definition__. This defines the parameters of a request. The parameters will then be used by the rest of the sections to determine how the access control is enforced. This request definition is a tuple consisting of the "Subject" making the request, the desired "Object" being requested, and the "Action" being taken on the object.

The second section is the __Policy definition__. This defines the name and order of the fields in the [Policy](#policy). The policy in the ACL definition above is "Subject", "Object", and "Action". Additionally, the "Effect" could result could be defined as well. If effect is not included then the result will be allow by default. 

TODO details on the sets of data casbin uses and how it determines if a request should be authorized.

I will be building a Resource Server based on the [Spring Boot](https://spring.io/projects/spring-boot/) framework.

### Policy

## Authentication

This article mainly deals with Authorization. The first step in any type of authorization check is to first establish if the request is authenticated. In my example code that responsibility is being delegated to Spring Security and Okta. [Here](https://www.baeldung.com/spring-security-okta) is a great tutorial that I used to set that up.
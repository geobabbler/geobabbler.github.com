---
layout: blog
title: Using Redmine for Proposal Management
post_author: bdollins
comments: true
categories:
- consulting
- open source
- proposals
- Redmine
---

I work at a technology consulting company that does a lot of software development. A while back, we started using <a href="http://www.redmine.org/">Redmine</a> to manage our software development projects. Redmine is an open-source, web-based project management tool. It provides a lot of capability, is easily customizable without coding, features SCM integration and, since it is built on Ruby on Rails, can be extended using RoR as well. We are still getting comfortable with it but it has been meeting our needs well and has been well-received by our customers.<!--more-->

As consultants, we also write a lot of proposals. Proposals in response to Federal government RFPs can be particularly cumbersome. Recently, we decided to use Redmine to help us manage a proposal effort. Although it is typically used for software development, Redmine, at a more abstract level, really is a project management tool that helps you to manage the development of a work product. We saw no reason why that product couldn't be a proposal.

Although the schedule is typically more compressed, a proposal effort has a due date, milestones, work assignments, requirements and everything else you would expect in a typical software project so we ran with it.

For this first attempt, we have tried to keep it simple. We created a few custom tracker types. These included "Volume" for each proposal volume, "Writing Assignment", "Graphics", "Pink Team Review", and "Red Team Review." We did some simple customization to the workflow for each of these trackers and defined roles that make sense for a proposal. As a result, we could enter in all of the assignments, attach the requirements (work requirements, proposal formatting instructions, evaluation criteria, etc.) and attach relevant files (RFP, resume templates, section templates, etc.).

Since technical content usually comes from the technical staff, they work in an environment with which they are familiar. As they update progress and time spent on their assignment, we can get an idea of the ongoing level of effort while also having the proposal schedule front and center. Redmines automatic e-mail notification feature was very useful in alerting staff to new assignments.

Overall, I've been impressed with the flexibility of Redmine and this application demonstrates that it can be flexible enough to be applied outside of its traditional use cases.
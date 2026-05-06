# Azure DevOps Working Guide

This guide describes how we use Azure DevOps Boards and Git branches to plan, deliver, and trace work. The project uses the Scrum process template, so user stories are represented as Product Backlog Items (PBIs).

## Azure DevOps Structure

Azure DevOps should be used as the single place to describe planned work, track delivery, and connect code changes back to business outcomes.

Recommended hierarchy:

```text
Epic
  Feature
    Product Backlog Item (PBI)
      Task
      Bug
```

Use the hierarchy consistently:

- **Epic**: a large business objective, product initiative, or strategic outcome. Epics usually span multiple features, teams, sprints, or releases.
- **Feature**: a deliverable capability within an Epic. A Feature should describe a coherent stream of work that delivers user or business value.
- **PBI**: a small, testable backlog item that can be planned into a sprint. PBIs describe the user need, expected outcome, and acceptance criteria.
- **Task**: implementation work needed to complete a PBI. Tasks should normally be 1 to 2 days of work, with 3 days as the maximum before the task should be split.
- **Bug**: a defect or incorrect behavior. Bugs should be linked to the relevant Feature or PBI when possible.

## Teams and Sub-Projects

Azure DevOps Teams can be used to manage sub-projects inside a single Azure DevOps project. This is useful when multiple workstreams share the same repository, delivery process, or reporting structure but need separate planning views.

A Team should represent a meaningful ownership boundary, such as:

- a product area
- a service or platform component
- a delivery stream
- a customer implementation
- a temporary cross-functional initiative

Each Team can have its own:

- backlog and board
- sprint planning view
- capacity planning
- dashboard
- alerts and notifications
- area path configuration
- iteration path configuration

Area Paths are the main mechanism for separating work between Teams. Assign each Team one or more Area Paths so that PBIs, Bugs, Features, and Tasks appear on the correct Team backlog and board. For example:

```text
Project
  Platform
  Web App
  Data Migration
  Reporting
```

In this model, each sub-project can have a Team and matching Area Path. Work assigned to `Project\Reporting` appears on the Reporting Team backlog, while work assigned to `Project\Platform` appears on the Platform Team backlog.

Best practices for Teams:

- Create a Team for each stable sub-project or delivery stream.
- Give each Team a default Area Path.
- Use Area Paths to filter backlogs, boards, queries, delivery plans, and dashboards.
- Avoid assigning the same work item to multiple active Team boards unless there is a deliberate reporting reason.
- Use parent Teams or management views for rollup reporting across multiple sub-projects.
- Keep Team names aligned with sub-project or ownership names.
- Assign at least one Team administrator who can manage Team settings, members, boards, and sprint configuration.

## Epics vs Features

Epics and Features are both portfolio-level work items, but they answer different planning questions.

Use an **Epic** when the work describes a broad outcome or initiative:

- too large for one delivery stream
- likely to span multiple Features
- likely to span multiple sprints or releases
- useful for senior stakeholder reporting
- focused on a strategic business objective

Use a **Feature** when the work describes a specific capability:

- small enough to be broken into PBIs
- owned by one Team or delivery stream where possible
- valuable enough to track separately
- suitable for release planning
- focused on a user-visible or operational capability

Features help delivery teams organize PBIs into practical streams of work. Epics help product owners, delivery leads, and stakeholders understand how those Features contribute to larger objectives.

Example:

```text
Epic: Improve customer onboarding
  Feature: Self-service account registration
    PBI: Create registration form
    PBI: Validate email address
    PBI: Send welcome email
  Feature: Onboarding progress tracking
    PBI: Show onboarding checklist
    PBI: Store completed onboarding steps
```

## Product Backlog Items

PBIs should describe the expected outcome clearly enough that product owners, developers, and testers reach the same understanding from reading the item.

A good PBI includes:

- a short, outcome-focused title
- business or user context
- acceptance criteria
- dependencies or assumptions
- links to related designs, documents, or code where relevant
- parent Feature
- Area Path for the owning Team
- Iteration Path when the PBI is planned into a sprint

Acceptance criteria should describe observable outcomes, not implementation details. They should be specific enough for development and testing to agree when the PBI is complete.

Example acceptance criteria:

```text
Given a registered user is on the sign-in page
When they enter a valid email and password
Then they are signed in and redirected to the dashboard
```

## Tasks

Tasks are used to break a PBI into implementation steps. They should be small enough to track daily progress.

Task guidelines:

- Size tasks at 1 to 2 days where possible.
- Split any task estimated above 3 days.
- Write task titles as concrete actions.
- Assign tasks to the person doing the work.
- Keep tasks under the PBI they contribute to.
- Update task state as work progresses.

Examples:

- Add database migration for onboarding status
- Implement API endpoint for checklist updates
- Add unit tests for email validation
- Update pipeline variable documentation

## Bugs

Bugs should describe the incorrect behavior, expected behavior, reproduction steps, and impact.

Use Bugs for defects rather than hiding defect work inside generic tasks. Link Bugs to the relevant PBI or Feature where the relationship is clear.

A good Bug includes:

- clear title
- environment
- actual result
- expected result
- reproduction steps
- screenshots, logs, or error messages where useful
- severity or priority
- affected Area Path

## Git Branching Strategy

Use a simple branching model based on:

- `main`
- `develop`
- short-lived feature branches

Branch purpose:

- **main**: stable production-ready code. This branch should always represent releasable code.
- **develop**: integration branch for completed work before release.
- **feature branches**: isolated branches for PBIs, Bugs, or small work items.

Protected branches are important Git branches with rules applied to stop unsafe or unreviewed changes. In Azure DevOps, `main` and `develop` should normally be protected branches. Protection can require pull requests, reviewer approval, passing builds and tests, resolved comments, linked work items, and restrictions on who can push or complete pull requests.

The purpose of protecting branches is to keep shared code stable. Developers should not push directly to `main` or `develop`; they should create a feature branch, open a pull request, pass review and validation, and then merge.

Recommended flow:

1. Create a feature branch from `develop`.
2. Commit focused changes to the feature branch.
3. Keep the branch up to date with `develop`.
4. Open a pull request into `develop`.
5. Link the pull request to the relevant PBI or Bug.
6. Complete review, build validation, and testing.
7. Merge into `develop`.
8. Promote from `develop` to `main` when preparing a release.

For urgent production fixes, create a hotfix branch from `main`, merge the fix back into `main`, and then merge the same fix into `develop` so the branches do not diverge.

## Branch Naming

Branch names should be predictable and traceable to Azure DevOps work items.

Use this format:

```text
user/pbi-number/sensible-name
```

Examples:

```text
jsmith/1234/add-registration-validation
agarcia/1290/fix-dashboard-timeout
mlee/1422/update-release-pipeline
```

Guidelines:

- Use lowercase words separated by hyphens.
- Include the Azure DevOps PBI or Bug number.
- Keep the name short but meaningful.
- Avoid spaces, punctuation, and vague names such as `updates` or `fixes`.
- Use one branch per PBI, Bug, or coherent small change.

## Pull Requests

All changes to protected branches should go through pull requests. Direct commits to `main` and `develop` should be blocked.

Pull request best practices:

- Link the PR to the PBI or Bug.
- Keep PRs small enough to review properly.
- Require at least one reviewer.
- Require successful build validation before merge.
- Resolve comments before completion.
- Use automatic reviewers for sensitive areas where appropriate.
- Prefer a clean merge strategy agreed by the team.
- Delete feature branches after merge.

PR reviews are a quality and security control, not just a formality. Reviewers are responsible for checking that the change is safe, maintainable, aligned with the requested work, and ready to be merged into shared code.

Reviewers should check that the PR:

- **Does not introduce malicious activity or security weaknesses.** This is the most important review responsibility. Reviewers should look for unsafe input handling, exposed secrets, insecure authentication or authorization logic, unexpected network calls, risky dependency changes, unsafe file access, command execution, logging of sensitive data, and any code that does more than the PBI or task requires.
- **Meets coding styles and standards.** Code should follow the project's naming conventions, formatting rules, architecture patterns, linting rules, and established implementation style.
- **Has appropriate test coverage.** Unit tests should cover isolated business logic and edge cases. Integration tests should cover behavior across module, API, database, pipeline, or service boundaries where the change depends on those interactions.
- **Aligns with the PBI and task intent.** The implementation should solve the described problem and satisfy the acceptance criteria. Reviewers should challenge unrelated changes, hidden scope expansion, or behavior that does not match the work item.
- **Avoids unnecessary duplication.** The PR should not replicate code that already exists. Shared behavior should use existing core modules, services, utilities, components, or libraries. New shared code should be placed where future work can reuse it safely.
- **Does not add unapproved packages.** Developers must not add new external packages, including NPM or NuGet packages, without approval from the Director and/or cyber assurance team. Reviewers should treat new dependencies as a security, licensing, maintenance, and supply-chain risk until approval is recorded.
- **Uses useful comments.** Comments should explain why code exists, why a decision was made, or what non-obvious behavior is being protected. Comments should not merely restate simple mechanics that are already clear from the code.

The PR description should summarize:

- what changed
- why it changed
- how it was tested
- any deployment or migration notes

> ***Never re-use a feature branch that has completed a pull request, always create a new feature branch!***

## Branch Policies

Apply branch policies to `main` and `develop`.

Recommended policies:

- require pull requests
- require a minimum number of reviewers
- check for linked work items
- require comment resolution
- require build validation
- limit merge types if the team wants consistent history
- automatically include reviewers for critical paths
- restrict who can push directly to protected branches

These policies protect branch quality and keep Azure DevOps work items connected to code changes.

## Definition of Ready

A PBI is ready for sprint planning when:

- the outcome is clear
- acceptance criteria are written
- dependencies are known
- the owning Team and Area Path are set
- the parent Feature is set
- the item is small enough for a sprint
- design, architecture, or security questions are resolved or explicitly called out

## Definition of Done

A PBI is done when:

- acceptance criteria are met
- code is reviewed and merged
- tests are added or updated where appropriate
- build validation passes
- documentation is updated where needed
- linked tasks are complete
- the PBI state reflects the completed work
- any required release or deployment notes are recorded

## Summary

Use Azure DevOps Teams to separate sub-project planning inside the project. Use Area Paths to route work to the right Team. Use Epics for strategic outcomes, Features for deliverable capabilities, PBIs for sprint-sized user or business value, and Tasks for daily implementation work. Keep Git branching simple, trace every branch and pull request back to Azure DevOps work items, and protect shared branches with policies.

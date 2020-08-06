class Clubhouse implements WebToolIntegration {
  matchUrl = "*://app.clubhouse.io/*";

  showIssueId = true;

  observeMutations = true;

  issueElementSelector = [
    ".story-attributes"
  ];

  getIssue(issueElement: HTMLElement, source: Source): WebToolIssue {
    const issueId = $$.try<HTMLInputElement>(".story-id input", issueElement).value;
    const projectName = $$.try(".story-project .value", issueElement).textContent;
    const issueName = $$.try(".story-name", issueElement).textContent;
    const tagNames = $$.all(".tag", issueElement).map(it => it.textContent.trim());

    return {
      issueId,
      issueName,
      issueUrl: source.path,
      projectName,
      serviceUrl: source.protocol + source.host,
      serviceType: "Clubhouse",
      tagNames
    }
  }

  render(issueElement: HTMLElement, linkElement: HTMLElement) {
    const host = $$('.story-id', issueElement);
    if (host) {
      linkElement.classList.add("action");
      linkElement.classList.add("flat-white");
      linkElement.style.marginTop = "15px";
      linkElement.style.width = "100%";
      linkElement.style.textAlign = "center";
      host.appendChild(linkElement);
    }
  }
}

IntegrationService.register(new Clubhouse());
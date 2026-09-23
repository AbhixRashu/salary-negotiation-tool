$apiKey = "26eee80d4bc943dbae71d91ad8597453"
$siteHost = "salarypitcher.com"
$baseUrl = "https://$siteHost"

$locales = @("en", "es", "fr", "de", "pt", "it", "ja")

$staticPages = @(
    "",
    "terms",
    "salary-negotiation-no-signup",
    "salary-calculator",
    "privacy",
    "pitch-assistant",
    "offer-comparison",
    "negotiation-strategy",
    "free-salary-negotiation-email-generator",
    "follow-up",
    "faq",
    "counter-offer-email-template",
    "company-salaries",
    "average-salary-by-role"
)

$blogSlugs = @(
    "can-you-lose-job-offer-negotiating",
    "how-much-to-counter-offer",
    "counter-offer-email-templates",
    "compare-two-job-offers",
    "recruiter-salary-expectations-script",
    "base-salary-vs-equity-vs-bonus"
)

$negotiateSlugs = @(
    "software-engineer",
    "product-manager",
    "data-scientist",
    "ux-designer",
    "nurse-practitioner",
    "marketing-manager",
    "devops-engineer",
    "sales-manager",
    "account-executive",
    "hr-business-partner"
)

$glossarySlugs = @(
    "what-is-gross-salary",
    "what-is-salary",
    "what-does-salary-mean",
    "how-does-salary-pay-work"
)

$guideSlugs = @(
    "how-to-answer-salary-expectations",
    "how-to-counter-lowball-offer",
    "how-to-negotiate-relocation-package",
    "how-to-negotiate-salary-after-job-offer",
    "how-to-negotiate-salary-after-layoff",
    "how-to-negotiate-sign-on-bonus",
    "how-to-negotiate-startup-stock-options",
    "negotiate-raise-promotion-current-job",
    "negotiate-salary-no-leverage",
    "negotiate-salary-phone-vs-email",
    "negotiate-salary-remote-job",
    "negotiate-total-compensation",
    "respond-to-job-offer-negotiate",
    "salary-negotiation-mistakes",
    "what-achievements-can-freshers-list",
    "what-to-negotiate-besides-salary"
)

$urlList = @()

foreach ($locale in $locales) {
    foreach ($page in $staticPages) {
        if ($page -eq "") {
            $urlList += "$baseUrl/$locale"
        } else {
            $urlList += "$baseUrl/$locale/$page"
        }
    }

    foreach ($slug in $blogSlugs) {
        $urlList += "$baseUrl/$locale/blog/$slug"
    }

    foreach ($slug in $negotiateSlugs) {
        $urlList += "$baseUrl/$locale/negotiate/$slug"
    }

    foreach ($slug in $glossarySlugs) {
        $urlList += "$baseUrl/$locale/glossary/$slug"
    }

    foreach ($slug in $guideSlugs) {
        $urlList += "$baseUrl/$locale/guides/$slug"
    }
}

$urlList += "$baseUrl/en/blog"
$urlList += "$baseUrl/en/guides"
$urlList += "$baseUrl/en/glossary"

Write-Host "Total URLs to submit: $($urlList.Count)"

$batchSize = 10000
for ($i = 0; $i -lt $urlList.Count; $i += $batchSize) {
    $batch = $urlList[$i..([Math]::Min($i + $batchSize - 1, $urlList.Count - 1))]

    $body = @{
        host = $siteHost
        key = $apiKey
        urlList = $batch
    } | ConvertTo-Json

    Write-Host "Submitting batch $([Math]::Floor($i / $batchSize) + 1) with $($batch.Count) URLs..."

    try {
        $response = Invoke-RestMethod -Uri "https://api.indexnow.org/IndexNow" -Method Post -Body $body -ContentType "application/json; charset=utf-8"
        Write-Host "Success! Response: $($response | ConvertTo-Json)"
    } catch {
        Write-Host "Error: $($_.Exception.Message)"
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            Write-Host "Response body: $responseBody"
        }
    }

    if ($i + $batchSize -lt $urlList.Count) {
        Start-Sleep -Seconds 1
    }
}

Write-Host "IndexNow submission complete!"

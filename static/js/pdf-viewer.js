document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search)
  const pdfName = urlParams.get("pdf")

  if (pdfName) {
    const pdfPath = `/static/pdf/Comisiones/${pdfName}`

    const cleanTitle = pdfName
      .replace(".pdf", "")
      .replace(/_/g, " ")
      .replace(/ACTA DE /g, "Acta de ")
      .replace(/COMISION/g, "Comisi�n")

    document.getElementById("pdfTitle").textContent = cleanTitle
    document.getElementById("documentTitle").textContent = cleanTitle
    document.getElementById("documentDescription").textContent =
      "Documento oficial del H. Ayuntamiento de Portal Institucional Municipal"

    const dateMatch = pdfName.match(/(\d{2})(\d{2})(\d{4})/)
    if (dateMatch) {
      const [, day, month, year] = dateMatch
      document.getElementById("documentDate").textContent = `${day}/${month}/${year}`
    }

    document.getElementById("pdfFrame").src = pdfPath

    document.getElementById("openPdfBtn").addEventListener("click", () => {
      window.open(pdfPath, "_blank")
    })

    document.getElementById("downloadPdfBtn").addEventListener("click", () => {
      const link = document.createElement("a")
      link.href = pdfPath
      link.download = pdfName
      link.click()
    })
  }
})






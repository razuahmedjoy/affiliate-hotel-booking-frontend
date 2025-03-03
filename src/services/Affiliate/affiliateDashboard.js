import secureAxios from "../secureAxios.js";

const downloadPDF = async () => {
    try {
        const response = await secureAxios.post(
            "/affiliates/download-qr",
            {
                responseType: "blob", // Ensures binary data is handled properly
            }
        );

        // Create a URL for the received PDF Blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create an anchor element and trigger a click to download the file
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "YOlast_QR.pdf"); // Set download filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Free up memory
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error downloading the PDF:", error);
    }
};


export {
    downloadPDF
}
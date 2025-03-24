import { Document, Page, Text, View, StyleSheet, PDFViewer, Image, Font } from "@react-pdf/renderer"
import PoppinRegular from "../../assets/fonts/Poppins-Regular.ttf"
import PoppinBold from "../../assets/fonts/Poppins-Bold.ttf"
import AffiliateCardBg from "@/assets/imgs/affiliate_card.png";
// Define page dimensions for 4x6 inches (72 DPI)
const PAGE_WIDTH = 4 * 72 // 288 points
const PAGE_HEIGHT = 6 * 72 // 432 points

Font.register({
    family: "Poppins",
    fonts: [{ src: PoppinRegular }, {
        src: PoppinBold,
        fontWeight: "bold",
    }],
})

// Create styles
const styles = StyleSheet.create({
    page: {
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT,
        position: "relative",
        backgroundColor: "#fff",
        fontFamily: "Poppins",
    },
    viewer: {
        width: "100%",
        height: "100vh",
    },
    flex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    headerSection: {
        backgroundColor: "#006B76", // Teal color from the image
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
    logoText: {
        color: "white",
        fontSize: 48,
        fontWeight: "bold",
        textAlign: "center",
    },
    tagline: {
        color: "white",
        fontSize: 14,
        textAlign: "center",
        marginTop: 0,
        marginBottom: 5,
    },
    qrSection: {
   
        top: 95,
        left: 10,
        width: 180,
        height: "auto",
        borderRadius: 50,

        // marginHorizontal: 20,
      
    },

    nameSection: {
        marginTop: 100,
        paddingHorizontal: 10,
        fontWeight: "bold",
        fontSize: 32,
    },
    name: {
        fontSize: 18,
        textTransform: "capitalize",
        textAlign: "center",
    },
    servicesText: {
        fontSize: 10,
        textAlign: "center",
        marginTop: 5,
        marginHorizontal: 10,
    },
    paymentSection: {
        marginTop: 20,
        alignItems: "center",
    },
    securePaymentText: {
        fontSize: 10,
        textAlign: "center",
        marginBottom: 5,
    },
    paymentLogos: {
        width: 200,
        height: 30,
        marginBottom: 10,
    },
    footer: {
        backgroundColor: "#006B76",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
    },
    footerText: {
        color: "white",
        fontSize: 12,
        textAlign: "center",
        fontWeight: "bold",
    },
    moneySection: {

        padding: 2,
        width: 140,
        height: 160,
        // marginHorizontal: 20,
        borderRadius: 10,
        alignItems: "left",
    },
    price: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
        transform: [{ rotate: "90deg" }],
    },
    rupee: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
        // rotate: 30 degrees,
        transform: [{ rotate: "45deg" }],
    },
    priceTag2: {
        backgroundColor: "#e5f41f",
        position: "absolute",
        right: 25,
        top: 25,
        width: 95,
        height: 95,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",

    },
    priceTag: {
        backgroundColor: "#07cf4d",
        position: "absolute",
        right: 20,
        top: 25,
        width: 95,
        height: 95,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",

    },
    orangecircle: {
        backgroundColor: "#fb6210",
        position: "absolute",
        right: 40,
        top: 18,
        width: 24,
        height: 20,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",

    },
    lightGreencircle: {
        backgroundColor: "#a5ff99",
        position: "absolute",
        right: 20,
        top: 30,
        width: 22,
        height: 20,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",

    },
    affiliateCardBg:{
        position: "absolute",
        right: 0,
        top: 0,
        width: "100%",
        height: "100%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1,
    }

})

// Create Document Component
export const AffiliateQRPDF = ({ user }) => (
    <Document>
        <Page size={[PAGE_WIDTH, PAGE_HEIGHT]} style={styles.page}>
            {/* Header Section with Logo */}
            {/* <View style={styles.headerSection}>
                <Text style={styles.logoText}>Yolast</Text>
                <Text style={styles.tagline}>Last Minute Travel Deals & Bookings</Text>
            </View> */}

            {/* QR Code Section */}
    

                <View style={styles.qrSection}>
                    <Image src={user?.qrCodeUrl || "/placeholder.svg"} />
                </View>
                {/* <View style={styles.moneySection}>
                    <View style={styles.orangecircle}>

                    </View>
                    <View style={styles.lightGreencircle}>

                    </View>
                    <View style={styles.priceTag2}>

                    </View>
                    <View style={styles.priceTag}>
                        <Text style={styles.rupee}>RS.</Text>
                        <Text style={styles.price}>10/-</Text>
                    </View>


                </View> */}

         
            <View style={styles.affiliateCardBg}>
                <Image src={AffiliateCardBg || "/placeholder.svg"} style={{ width: "100%", height: "100%" }} />
            </View>

            {/* Price Tag */}

            {/* Name Section */}
            <View style={styles.nameSection}>
                <Text style={styles.name}>{user?.name}</Text>
            </View>

            {/* Services Text */}
            {/* <Text style={styles.servicesText}>
                Homestay, Hotels, Travel Guide, Tour packages, Medical Tourism and much more!
            </Text> */}

            {/* Payment Section */}
            {/* <View style={styles.paymentSection}>
                <Text style={styles.securePaymentText}>SECURE PAYMENT BY</Text>
                <Image src="/placeholder.svg?height=30&width=200" style={styles.paymentLogos} />
            </View> */}

            {/* Footer */}
            {/* <View style={styles.footer}>
                <Text style={styles.footerText}>WE MAKE IT FAST! OR YOUR MONEY BACK!</Text>
            </View> */}
        </Page>
    </Document>
)

// Create PDF Viewer Component with QR Code URL prop
export default function YolastPDFTemplate({ user }) {
    return (
        <div className="w-full h-screen">
            <PDFViewer style={styles.viewer}>
                <AffiliateQRPDF user={user} />
            </PDFViewer>
        </div>
    )
}


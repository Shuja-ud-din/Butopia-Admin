import React from 'react'
import "./PaymentReceipt.css"
import templateLogo from '../../assets/logos/templateLogo.jpg'

const PaymentReceipt = () => {
    return (
        <>
            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                }}>
                    <img src={templateLogo} alt="" style={{
                        height: '5rem',
                    }} />
                </div>
                <h1 style={{
                    color: '#333',
                    textAlign: 'center',
                    fontSize: '2rem',
                    marginBottom: '1rem',
                }}>Thank You for<br /> Your Payment</h1>
                <p style={{
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                }}>Dear Client,</p>
                <p style={{
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                }}>We hope this email finds you well. We wanted to extend our heartfelt thanks for your recent payment made through our Beauty Clinic web app. Your trust in us means the world, and we're thrilled to have you as a valued client.</p>
                <p style={{
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                }}>The documents may include:</p>
                <div style={{
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px',
                }}>
                    <p><strong><span style={{
                        fontWeight: '800',
                    }}>.</span> Annual Reports</strong></p>
                    <p><strong><span style={{
                        fontWeight: '800',
                    }}>.</span> Initial Reports</strong></p>
                    <p><strong><span style={{
                        fontWeight: '800',
                    }}>.</span> Multiple Amendment Filings</strong></p>
                    <p><strong><span style={{
                        fontWeight: '800',
                    }}>.</span> Total Amount Paid</strong></p>
                    <p><strong><span style={{
                        fontWeight: '800',
                    }}>.</span> Publications</strong></p>
                </div>
                <p style={{
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                }}>Rest assured, our team is dedicated to ensuring you have a seamless and rejuvenating experience during your visit. Should you have any questions or need further assistance, please feel free to reach out to our customer support team at [Contact Information].</p>
                <p style={{
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                }}>We look forward to welcoming you to our Beauty Clinic and providing you with top-notch service that exceeds your expectations. Thank you once again for choosing [Beauty Clinic Name].</p>
                <div style={{
                    marginTop: '30px',
                    textAlign: 'center',
                    color: '#999',
                }}>
                    <p>Warm regards</p>
                </div>
            </div>
        </>
    )
}

export default PaymentReceipt
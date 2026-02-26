"use client";
import { usePathname } from "next/navigation";
import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import PageContainer from '../PageContainer/PageContainer';
import CardContainerEdit from '../Cards/CardContainerEdit';
import Login from "@/components/LoginSystem/LoginForm/Login";
import Image from "next/image";
import UploadModal from "../Modals/UploadModal";

const BentoGrid = () => {
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState(0);
    const [activeTab, setActiveTab] = useState<"signin" | "homepage">("homepage");
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [fullscreenPreview, setFullscreenPreview] = useState(false);
    const [loginMode, setLoginMode] = useState<"" | "white">("");
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [showPublishModal, setShowPublishModal] = useState(false);

    const handlePublish = () => setShowPublishModal(true);

    const confirmPublish = () => {
        if (activeTab === "signin") {
            localStorage.setItem("published-login-bg", backgroundImage || "");
            localStorage.setItem("published-login-mode", loginMode);
        }
        setShowPublishModal(false);
        alert("Published successfully!");
    };

    const handleUploadComplete = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => setBackgroundImage(reader.result as string);
        reader.readAsDataURL(file);
        setIsUploadModalOpen(false);
    };

    const handleBack = () => setBackgroundImage(null);


    const pages = [
        // Page 1
        [
            { id: 1, title: "Bookings Planner", description: "A centralized view of all planned and on-demand bookings in one place.", color: "bg-[var(--green)]", span: "col-span-1 row-span-1", lockedImage: "/cards/Locked-Booking-Planner.svg", hasAccess: true, flippable: false },
            { id: 2, title: "", description: "", color: "bg-[var(--background)]", span: "col-span-1 row-span-1", image: "/cards/CIRCULAR TEXT.svg" },
            { id: 3, title: "Control Room", description: "Serves as the central command center of the platform, giving administrators full oversight and configuration power across the entire system.", color: "bg-[var(--dark-bg)]", cardTextImage: "", layoutType: "column", span: "col-span-1 row-span-2", flippable: true, backItems: ["Design Settings", "Permissions", "Property Management", "Event", "Policies"], lockedImage: "/cards/locked-control-room.svg", hasAccess: true },
            { id: 4, title: "fatma Ashraf", description: "Co-founder", color: "bg-[var(--background)]", span: "col-span-1 row-span-2", isSplit: true, profileImage: "/cards/profile.svg", characterImage: "/cards/character.svg" },
            { id: 5, title: "Growth Leads", description: "Pipeline to manage potential members and opportunities, converting them into long-term community members.", flippable: false, color: "bg-[var(--color-primary)]", span: "col-span-1 row-span-2", cardTextImage: "/cards/card5.svg", layoutType: "column", lockedImage: "/cards/locked-Growth-Leads.svg", hasAccess: true },
            { id: 6, title: "People of the Circle", description: "The circle represents our community of members who are connected through shared spaces, ideas, and experiences.", flippable: true, color: "bg-[var(--dark-bg)]", span: "col-span-1 row-span-1", lockedImage: "/cards/locked-People-Of-The-Circle.svg", hasAccess: true },
            { id: 7, title: "Insights", description: "A dashboard for real-time data on bookings, revenue, members, and workspace performance — all at a glance.", color: "bg-[var(--dark-bg)]", flippable: true, span: "col-span-1 row-span-1", lockedImage: "/cards/locked-Insights.svg", hasAccess: true },
            { id: 8, title: "Operations \nCenter", description: "Central hub linking key operational tasks for seamless tracking, reporting, and workflow management.", color: "bg-[var(--green)]", span: "col-span-2 row-span-1", cardTextImage: "/cards/card8.svg", layoutType: "row", flippable: true, backItems: ["Event creation, Management and RSVP", "Incident Reporting", "Tickets", "Report a Bug"], lockedImage: "/cards/locked-Operations-Center.svg", hasAccess: true },
        ],
        // Page 2
        [
            { id: 9, title: "Partnerships Network", description: "Oversee and manage all partnerships, deals, and strategic collaborations", color: "bg-[#FFD3D2]", span: "col-span-1 row-span-1", flippable: true, backItems: ["Partnerships", "Corporate Deals", "Services"], lockedImage: "/cards/locked-Partnerships-Network.svg", hasAccess: true },
            { id: 2, title: "", description: "", color: "bg-[var(--background)]", span: "col-span-1 row-span-1", image: "/cards/CIRCULAR TEXT.svg" },
            { id: 10, title: "Security \nControl", description: "Serves as the central command center of the platform, giving administrators full oversight and configuration power across the entire system.", color: "bg-[var(--dark-bg)]", span: "col-span-1 row-span-2", cardTextImage: "/cards/card11.svg", layoutType: "column", flippable: true, backItems: ["Manage Access Control", "Space Access Logs", "Entry / Exit Permits", "Visitor Management", "Emergency Protocols & Alerts", "Security Audit Logs"], lockedImage: "/cards/locked-Security-Control.svg", hasAccess: true },
            { id: 4, title: "fatma Ashraf", description: "Co-founder", color: "bg-[var(--background)]", span: "col-span-1 row-span-2", isSplit: true, profileImage: "/cards/profile.svg", characterImage: "/cards/character.svg" },
            { id: 11, title: "Finance Center", description: "A control panel for streamlined financial records and insights collaborations.", color: "bg-[var(--dark-bg)]", span: "col-span-1 row-span-2", cardTextImage: "", layoutType: "column", flippable: true, backItems: ["Wallet", "Reports", "Lease & Contract Billing", "Invoicing & Payment Processing", "Refunds, Deposits, Late Fees", "Multi-currency or tax handling (if applicable).", "Expense tracking & budgeting"], lockedImage: "/cards/locked-Finance-Center.svg", hasAccess: true },
            { id: 12, title: "Experience& \nEngagement Lab", description: "A tools lab that drives engagement and growth where experience is refined and elevated.", color: "bg-[var(--dark-bg)]", span: "col-span-1 row-span-1", flippable: true, backItems: ["Announcements", "Promocodes", "NPS - Member Feedback", "New Rooms"], lockedImage: "/cards/Locked-Experience-Engagement-Lab.svg", hasAccess: true },
            { id: 13, title: "Website builder", description: "A streamlined repository for all data collect, analyze, and access key metrics to drive informed decisions.", color: "bg-[var(--dark-bg)]", span: "col-span-1 row-span-1", flippable: true, backItems: ["CopolitanX Website"], lockedImage: "/cards/locked-Website-Builder.svg", hasAccess: true },
            { id: 14, title: "Facility \nManagement ", description: "Central hub linking key operational tasks for seamless tracking, reporting, and workflow management.", color: "bg-[var(--dark-bg)]", span: "col-span-2 row-span-1", cardTextImage: "/cards/card15.svg", layoutType: "row", flippable: true, backItems: ["Assets Management (Space Inventory)", "Maintenance Requests", "Cleaning Schedules", "Maintenance Logs and Alerts"], lockedImage: "/cards/locked-Facility-Management.svg", hasAccess: true },
        ],
        // Page 3
        [
            { id: 15, title: "Data Hub", description: "A dashboard for real-time data on bookings, revenue, members, and workspace performance — all at a glance", color: "bg-[#FFD3D2]", span: "col-span-1 row-span-1", flippable: true, backItems: ["Reports Library", "Usage Analytics", "Automation Rules", "Alerts", "API Access"], lockedImage: "/cards/locked-Data-Hub.svg", hasAccess: true },
            { id: 2, title: "", description: "", color: "bg-[var(--background)]", span: "col-span-1 row-span-1", image: "/cards/CIRCULAR TEXT.svg" },
            { id: 10, title: "Security \nControl", description: "Serves as the central command center of the platform, giving administrators full oversight and configuration power across the entire system.", color: "invisible pointer-events-none", span: "col-span-1 row-span-2", cardTextImage: "/cards/card11.svg", layoutType: "column", backItems: ["Manage Access Control", "Space Access Logs", "Entry / Exit Permits", "Visitor Management", "Emergency Protocols & Alerts", "Security Audit Logs"], lockedImage: "/cards/locked-Security-Control.svg", hasAccess: true },
            { id: 4, title: "fatma Ashraf", description: "Co-founder", color: "bg-[var(--background)]", span: "col-span-1 row-span-2", isSplit: true, profileImage: "/cards/profile.svg", characterImage: "/cards/character.svg" },
            { id: 11, title: "Finance Center", description: "A control panel for streamlined financial records and insights collaborations.", color: "invisible pointer-events-none", span: "col-span-1 row-span-2", backItems: ["Revenue Streams", "Expense Ledger", "Payouts", "Tax & Compliance", "Forecasting"] },
            { id: 12, title: "Experience& \nEngagement Lab", description: "A tools lab that drives engagement and growth where experience is refined and elevated.", color: "invisible pointer-events-none", span: "col-span-1 row-span-1", backItems: ["Member Feedback", "NPS Tracking", "Community Events", "Promotions", "Retention Insights"] },
            { id: 13, title: "Data Hub", description: "A streamlined repository for all data collect, analyze, and access key metrics to drive informed decisions.", color: "invisible pointer-events-none", span: "col-span-1 row-span-1", backItems: ["Data Sources", "Dashboards", "Exports", "Data Quality", "Access Requests"] },
            { id: 14, title: "Facility \nManagement ", description: "Central hub linking key operational tasks for seamless tracking, reporting, and workflow management.", color: "invisible pointer-events-none", span: "col-span-2 row-span-1", cardTextImage: "/cards/card15.svg", layoutType: "row", backItems: ["Workorders", "Maintenance Schedule", "Vendor Management", "Asset Inventory", "Space Utilization"] },
        ],
    ];

    const nextPage = () => { if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1); };
    const prevPage = () => { if (currentPage > 0) setCurrentPage(currentPage - 1); };

    return (
        <div className="w-full h-full px-1 sm:px-1 md:px-2 lg:px-3 xl:px-5 flex flex-col overflow-hidden">
            <Navigation
                currentPage={currentPage}
                pages={pages}
                setCurrentPage={setCurrentPage}
                totalPages={pages.length}
                onPrev={prevPage}
                onNext={nextPage}
                showToggle={true}
                activeTab={activeTab}
                onToggleChange={setActiveTab}
                hideNavElements={activeTab === "signin"}
            />

            <div className="flex-1 overflow-hidden w-full min-h-0">
                {activeTab === "signin" ? (
                    <div className="h-full w-full flex flex-col items-center justify-center p-0 m-0">
                        <div className="flex flex-row gap-3 w-full h-screen mb-8">

                            {/* Auth Layout Preview Area */}
                            <div className="flex-1 relative rounded-[48px] overflow-hidden shadow-2xl border border-white/5">
                                {/* Background */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                                    style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'url(/login/background.svg)' }}
                                />
                                {/* Login card positioned exactly like real auth/login (flex-end) */}
                                <div className="absolute inset-0">
                                    <Login
                                        editorMode={true}
                                        forceMode={loginMode}
                                        onModeToggle={setLoginMode}
                                    />
                                </div>
                            </div>

                            {/* Control Sidebar */}
                            <div className="flex flex-col gap-2 shrink-0 justify-start pt-12">
                                <button onClick={() => setIsUploadModalOpen(true)}  title="Upload Background">
                                    <Image src="/cards/uploadedit.svg" alt="Upload" width={32} height={32} />
                                </button>
                                <button onClick={() => setFullscreenPreview(true)}  title="Fullscreen Preview">
                                    <Image src="/cards/previewedit.svg" alt="Preview" width={32} height={32}  />
                                </button>
                                <button onClick={handlePublish} title="Publish Settings">
                                    <Image src="/cards/publishedit.svg" alt="Publish" width={32} height={32}  />
                                </button>
                                <button onClick={handleBack}  title="Reset Background">
                                    <Image src="/cards/flipwhiteicon.svg" alt="Reset" width={24} height={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        className="flex w-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        style={{ transform: `translateX(-${currentPage * 100}%)` }}
                    >
                        {pages.map((page, pageIndex) => (
                            <PageContainer key={pageIndex}>
                                {page.map((card) => (
                                    <CardContainerEdit key={card.id} card={card} />
                                ))}
                            </PageContainer>
                        ))}
                    </div>
                )}
            </div>

            {/* FULLSCREEN PREVIEW OVERLAY */}
            {fullscreenPreview && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 m-0">
                    <button
                        onClick={() => setFullscreenPreview(false)}
                        className="absolute top-8 right-8 p-3 rounded-full  transition-colors z-[10001] cursor-pointer shadow-xl"
                    >
                        <Image src="/cards/exitedit.svg" alt="Close" width={48} height={48} />
                    </button>
                    <div className="w-full h-full relative overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'url(/login/background.svg)' }}
                        />
                        <div className="absolute inset-0">
                            <Login editorMode={true} forceMode={loginMode}  
                                      
                                        onModeToggle={setLoginMode} />
                        </div>
                    </div>
                </div>
            )}

            {/* UPLOAD MODAL */}
            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                cardId={-1}
                onUpload={handleUploadComplete}
            />

            {/* PUBLISH MODAL */}
            {showPublishModal && (
                <div className="fixed inset-0 z-[20000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-[40px] p-10 max-w-[400px] w-full relative flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-300">
                        <button onClick={() => setShowPublishModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors">
                            <Image src="/cards/X.svg" alt="Close" width={20} height={20} className="opacity-40" />
                        </button>
                        <div className="w-32 h-32 mb-6 flex items-center justify-center">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 2L11 13" stroke="#7029CF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M22 2L15 22L11 13L1 9L22 2Z" fill="#7029CF" stroke="#7029CF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 uppercase tracking-tight" style={{ fontFamily: 'GT Walsheim' }}>Publish</h2>
                        <p className="text-gray-600 mb-8 font-medium leading-relaxed">Are you sure you want to<br />publish these changes?</p>
                        <div className="flex gap-4 w-full">
                            <button onClick={confirmPublish} className="flex-1 bg-[#7029CF] text-white py-3 rounded-2xl font-bold hover:bg-[#5d22ad] transition-all active:scale-95">Confirm</button>
                            <button onClick={() => setShowPublishModal(false)} className="flex-1 bg-white text-[#7029CF] py-3 rounded-2xl font-bold border-2 border-[#7029CF] hover:bg-purple-50 transition-all active:scale-95">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BentoGrid;
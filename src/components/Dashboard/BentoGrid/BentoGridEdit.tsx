"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from 'react';
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
    const [savedBackgroundImage, setSavedBackgroundImage] = useState<string | null>(null);
    const [isEditingImage, setIsEditingImage] = useState(false);
    const [fullscreenPreview, setFullscreenPreview] = useState(false);
    const [loginMode, setLoginMode] = useState<"" | "white">("");
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [showPublishModal, setShowPublishModal] = useState(false);

    const handlePublish = () => setShowPublishModal(true);

    const handleSave = () => {
        setSavedBackgroundImage(backgroundImage);
        setIsEditingImage(false);
    };

    const handleBackEdit = () => {
        setBackgroundImage(savedBackgroundImage);
        setIsEditingImage(false);
    };

    const confirmPublish = () => {
        if (activeTab === "signin") {
            localStorage.setItem("published-login-bg", backgroundImage || "");
            localStorage.setItem("published-login-mode", loginMode);
        }
        setShowPublishModal(false);
    };

    const handleUploadComplete = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setBackgroundImage(result);
            setIsEditingImage(true);
            setIsUploadModalOpen(false);
        };
        reader.readAsDataURL(file);
    };

    const handleBack = () => {
        setBackgroundImage(savedBackgroundImage);
        setIsEditingImage(false);
    };

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

    // shared right value — matches the px padding on the outer wrapper
    const sidebarRight = "-right-5 sm:-right-5 md:-right-7 lg:-right-8 xl:-right-8";

    return (
        <div className="w-full h-full px-5 sm:px-5 md:px-7 lg:px-8 xl:px-8 flex flex-col overflow-hidden">
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

            <div className="flex-1 w-full min-h-0">
                {activeTab === "signin" ? (

                    /* signin: relative wrapper so sidebar can be absolute */
                    <div className="relative h-full w-full pr-4">
                        <div className="h-full w-full max-h-[99dvh] mb-5">

                            {/* Auth Layout Preview Area — full width, sidebar floats outside */}
                            <div className="h-full relative rounded-[30px] ">
                                <div
                                    key={backgroundImage}
                                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 "
                                    style={{ backgroundImage: backgroundImage ? `url('${backgroundImage}')` : "url('/login/background.svg')" }}
                                />
                                <div className="overflow-y-auto scrollbar-hide">
                                    <div className="w-full">
                                        <Login
                                            previewMode={true}
                                            editorMode={true}
                                            forceMode={loginMode}
                                            onModeToggle={setLoginMode}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Control Sidebar — signin, absolute in right padding */}
                        <div className={`absolute top-3 ${sidebarRight} flex flex-col gap-2 p-2`}>
                            <button onClick={() => setIsUploadModalOpen(true)} title="Upload Background">
                                <Image src="/cards/uploadedit.svg" alt="Upload" width={28} height={28} />
                            </button>
                            <button onClick={() => setFullscreenPreview(true)} title="Fullscreen Preview">
                                <Image src="/cards/previewedit.svg" alt="Preview" width={28} height={28} />
                            </button>

                            {isEditingImage && (
                                <button onClick={handleBackEdit} title="Back to Main">
                                    <Image src="/cards/backedit.svg" alt="Back Edit" width={28} height={28} />
                                </button>
                            )}

                            {isEditingImage ? (
                                <button onClick={handleSave} title="Save Changes">
                                    <Image src="/cards/savedit.svg" alt="Save" width={28} height={28} />
                                </button>
                            ) : (
                                <button onClick={handlePublish} title="Publish Settings">
                                    <Image src="/cards/publishedit.svg" alt="Publish" width={28} height={28} />
                                </button>
                            )}

                            <button onClick={handleBack} title="Reset Background">
                                <Image src="/cards/flipwhiteicon.svg" alt="Reset" width={24} height={24} />
                            </button>
                        </div>
                    </div>

                ) : (

                    /* homepage: relative outer (no overflow) + overflow-hidden inner for slider */
                    <div className="relative w-full h-full">
                        <div className="w-full h-full overflow-hidden">
                            <div
                                className="flex w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
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
                        </div>

                        {/* Control Sidebar — homepage, absolute in right padding */}
                        <div className={`absolute top-3 ${sidebarRight} flex flex-col gap-2 p-2`}>
                            <button onClick={() => setFullscreenPreview(true)} title="Fullscreen Preview">
                                <Image src="/cards/previewedit.svg" alt="Preview" width={28} height={28} />
                            </button>
                            <button onClick={handlePublish} title="Publish">
                                <Image src="/cards/publishedit.svg" alt="Publish" width={28} height={28} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* FULLSCREEN PREVIEW OVERLAY */}
            {fullscreenPreview && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 m-0">
                    <button
                        onClick={() => setFullscreenPreview(false)}
                        className="absolute top-8 right-8 p-3 rounded-full transition-colors z-[10001] cursor-pointer"
                    >
                        <Image src="/cards/exitedit.svg" alt="Close" width={48} height={48} className="w-5 h-5 sm:w-4 sm:h-4 md:h-5 md:w-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8" />
                    </button>
                    <div className="w-full h-full relative overflow-hidden">
                        <div
                            key={backgroundImage}
                            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
                            style={{ backgroundImage: backgroundImage ? `url('${backgroundImage}')` : "url('/login/background.svg')" }}
                        />
                        <div className="absolute inset-0 overflow-hidden">
                            <Login editorMode={true} forceMode={loginMode} onModeToggle={setLoginMode} />
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" fill="none">
                                <g clipPath="url(#clip0_939_3011)">
                                <path d="M173.127 0.288672C173.042 0.315742 172.952 0.278476 172.868 0.309765L4.11754 63.5911C2.26867 64.2865 0.960859 65.96 0.7341 67.9273C0.507342 69.8947 1.39855 71.8205 3.04633 72.9174L40.0424 97.5782L53.5769 154.131C53.6124 154.279 53.7038 154.398 53.7512 154.541C54.9676 158.251 59.6396 159.428 62.4345 156.633L88.9093 130.159L129.609 157.293C132.558 159.27 136.623 157.794 137.607 154.352L179.794 6.69556C180.927 2.72149 177.197 -1.01774 173.127 0.288672ZM66.4051 107.556C65.5318 108.44 65.2688 109.157 64.9626 110.272C64.9587 110.293 64.9496 110.312 64.9457 110.333L59.0612 131.729L50.6772 96.6947L132.354 40.69L66.4051 107.556Z" fill="#7029CF"/>
                                <path d="M35.3691 144.607C33.3093 142.548 29.9719 142.547 27.9121 144.607L1.54486 170.975C-0.514952 173.035 -0.514952 176.372 1.54486 178.432C3.60502 180.492 6.9417 180.492 9.00186 178.432L35.3691 152.064C37.4289 150.005 37.4289 146.667 35.3691 144.607Z" fill="#7029CF"/>
                                <path d="M35.3691 112.967C33.3093 110.907 29.9719 110.907 27.9121 112.967L1.54486 139.334C-0.514952 141.394 -0.514952 144.731 1.54486 146.791C3.60502 148.851 6.9417 148.851 9.00186 146.791L35.3691 120.424C37.4289 118.364 37.4289 115.027 35.3691 112.967Z" fill="#7029CF"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_939_3011">
                                <rect width="180" height="180" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <h2 className="text-[#2C2C2C] mb-2 uppercase tracking-tight" style={{ fontFamily: 'GT Walsheim', fontWeight: "700", fontSize: "18px" }}>Publish</h2>
                        <p className="text-[#2C2C2C] mb-8 leading-relaxed" style={{ fontFamily: 'GT Walsheim', fontWeight: "600", fontSize: "18px" }}>Are you sure you want to<br />publish these changes?</p>
                        <div className="flex gap-4 w-full">
                            <button onClick={confirmPublish} className="flex-1 bg-[#7029CF] text-white py-3 rounded-[1536] hover:bg-[#5214a3] transition-all active:scale-95">Confirm</button>
                            <button onClick={() => setShowPublishModal(false)} className="flex-1 bg-white text-[#7029CF] py-3 rounded-[1536] border-2 border-[#7029CF] hover:bg-purple-50 transition-all active:scale-95">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BentoGrid;
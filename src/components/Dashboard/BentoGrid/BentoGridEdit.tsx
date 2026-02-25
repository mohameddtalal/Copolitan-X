"use client";
import { usePathname } from "next/navigation";
import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import PageContainer from '../PageContainer/PageContainer';
import CardContainerEdit from '../Cards/CardContainerEdit';

const BentoGrid = () => {
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        // Page 1
        [
            { id: 1, title: "Bookings Planner", description: "A centralized view of all planned and on-demand bookings in one place.", color: "bg-[var(--green)]", span: "col-span-1 row-span-1", lockedImage: "/cards/Locked-Booking-Planner.svg", hasAccess: true ,flippable: false},
            { id: 2, title: "", description: "", color: "bg-[var(--background)]", span: "col-span-1 row-span-1", image: "/cards/CIRCULAR TEXT.svg" },
            { id: 3, title: "Control Room", description: "Serves as the central command center of the platform, giving administrators full oversight and configuration power across the entire system.", color: "bg-[var(--dark-bg)]", cardTextImage: "", layoutType: "column", span: "col-span-1 row-span-2", flippable: true, backItems: ["Design Settings", "Permissions", "Property Management", "Event", "Policies"], lockedImage: "/cards/locked-control-room.svg", hasAccess: true },
            { id: 4, title: "fatma Ashraf", description: "Co-founder", color: "bg-[var(--background)]", span: "col-span-1 row-span-2", isSplit: true, profileImage: "/cards/profile.svg", characterImage: "/cards/character.svg" },
            { id: 5, title: "Growth Leads", description: "Pipeline to manage potential members and opportunities, converting them into long-term community members." ,flippable: false,color: "bg-[var(--color-primary)]", span: "col-span-1 row-span-2", cardTextImage: "/cards/card5.svg", layoutType: "column", lockedImage: "/cards/locked-Growth-Leads.svg", hasAccess: true },
            { id: 6, title: "People of the Circle", description: "The circle represents our community of members who are connected through shared spaces, ideas, and experiences.",flippable: true, color: "bg-[var(--dark-bg)]", span: "col-span-1 row-span-1", lockedImage: "/cards/locked-People-Of-The-Circle.svg", hasAccess: true },
            { id: 7, title: "Insights", description: "A dashboard for real-time data on bookings, revenue, members, and workspace performance — all at a glance.", color: "bg-[var(--dark-bg)]",flippable: true, span: "col-span-1 row-span-1", lockedImage: "/cards/locked-Insights.svg", hasAccess: true },
            { id: 8, title: "Operations \nCenter", description: "Central hub linking key operational tasks for seamless tracking, reporting, and workflow management.", color: "bg-[var(--green)]", span: "col-span-2 row-span-1", cardTextImage: "/cards/card8.svg", layoutType: "row", flippable: true, backItems: ["Event creation, Management and RSVP", "Incident Reporting", "Tickets", "Report a Bug"], lockedImage: "/cards/locked-Operations-Center.svg", hasAccess: true },
        ],
        // Page 2
        [
            { id: 9, title: "Partnerships Network", description: "Oversee and manage all partnerships, deals, and strategic collaborations", color: "bg-[#FFD3D2]", span: "col-span-1 row-span-1", flippable: true, backItems: ["Partnerships", "Corporate Deals", "Services"], lockedImage: "/cards/locked-Partnerships-Network.svg", hasAccess: true },
            { id: 2, title: "", description: "", color: "bg-[var(--background)]", span: "col-span-1 row-span-1", image: "/cards/CIRCULAR TEXT.svg" },
            { id: 10, title: "Security \nControl", description: "Serves as the central command center of the platform, giving administrators full oversight and configuration power across the entire system.", color: "bg-[var(--dark-bg)]", span: "col-span-1 row-span-2", cardTextImage: "/cards/card11.svg", layoutType: "column", flippable: true, backItems: ["Manage Access Control", "Space Access Logs", "Entry / Exit Permits", "Visitor Management", "Emergency Protocols & Alerts", "Security Audit Logs"], lockedImage: "/cards/locked-Security-Control.svg", hasAccess: true },
            { id: 4, title: "fatma Ashraf", description: "Co-founder", color: "bg-[var(--background)]", span: "col-span-1 row-span-2", isSplit: true, profileImage: "/cards/profile.svg", characterImage: "/cards/character.svg" },
            { id: 11, title: "Finance Center", description: "A control panel for streamlined financial records and insights collaborations.", color: "bg-[var(--dark-bg)]", span: "col-span-1 row-span-2", cardTextImage: "", layoutType: "column",flippable: true, backItems: ["Wallet", "Reports", "Lease & Contract Billing", "Invoicing & Payment Processing", "Refunds, Deposits, Late Fees", "Multi-currency or tax handling (if applicable).", "Expense tracking & budgeting"], lockedImage: "/cards/locked-Finance-Center.svg", hasAccess: true },
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

    const nextPage = () => {
        if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

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
            />
            <div className="flex-1 overflow-hidden w-full min-h-0">
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
            </div>
        </div>
    );
};

export default BentoGrid;
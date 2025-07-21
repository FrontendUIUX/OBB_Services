
document.addEventListener("DOMContentLoaded", function () {
    const urlPath = window.location.pathname;
    const fullUrl = window.location.href.toLowerCase();

    // Adjust form layout on specific page
    if (urlPath === '/Public/Runtime/Form.aspx') {
        const form = document.querySelector('.theme-entry .runtime-form');
        if (form) {
            form.style.width = '100%';
            form.style.marginLeft = '0';
        }
    }

    // Exit early on specific runtime page
    if (urlPath === "/Runtime/Runtime/Form.aspx") return;

    // Ensure jQuery is loaded
    if (typeof jQuery === "undefined") {
        console.error("jQuery is required for this script.");
        return;
    }

    const isArabic = fullUrl.includes("publicar");

    const sidebar = $('<div id="sidebar" class="sidebar"></div>');
    const logoContainer = $('<div class="navbarBrand"><a target="_blank"><img src="https://frontenduiux.github.io/OBB_Services/Images/OBBLogo.png" alt="Oman Broad Band"></a></div>');
    const logoLink = $('<a href="#"></a>');
    logoContainer.append(logoLink);
    sidebar.append(logoContainer);
    sidebar.append(`<div class="sidebar-section topic">${isArabic ? "القائمة" : "MENU"}</div>`);

    let menuItems;
    const currentUrl = window.location.href;

    if (currentUrl.includes("ArchivingRequest") || currentUrl.includes("RAP") || currentUrl.includes("Retrieval") || currentUrl.includes("ArchivingLandingForm")) {
        menuItems = [
            { text: "Home", url: "/Runtime/Runtime/Form/ArchivingLandingForm/" },
            { text: "Tasks List", url: "/Runtime/Runtime/Form/RAPTaskListForm/" },
            { text: "Completed", url: "/Runtime/Runtime/Form/RAPCompletedForm/" },
            { text: "In Progress", url: "/Runtime/Runtime/Form/RAPInProgressForm/" },
            { text: "Archived Requests", url: "/Runtime/Runtime/Form/RAPArchivedForm/" }
        ];
    } else if (currentUrl.includes("VRM")) {
        menuItems = [
            { text: "Home", url: "/Runtime/Runtime/Form/VRM.LandingForm/" },
            {
                text: "New Request", url: "", children: [
                    { text: "New Document", url: "/Runtime/Runtime/Form/NewDocCreation.SubmitForm/" },
                    { text: "Archiving Document", url: "/Runtime/Runtime/Form/ArchivingDoc.SubmitForm/" }
                ]
            },
            { text: "Tasks List", url: "/Runtime/Runtime/Form/VRMTaskListForm/" },
            {
                text: "New Document", url: "", children: [
                    { text: "Completed", url: "/Runtime/Runtime/Form/VRMNewDocCompletedForm/" },
                    { text: "In Progress", url: "/Runtime/Runtime/Form/VRMNewDocInProgressForm/" }
                ]
            },
            {
                text: "Archiving Document", url: "", children: [
                    { text: "Completed", url: "/Runtime/Runtime/Form/VRMArchivingCompletedForm/" },
                    { text: "In Progress", url: "/Runtime/Runtime/Form/VRMArchivingInProgressForm/" }
                ]
            },
            {
                text: "Request Access", url: "", children: [
                    { text: "Completed", url: "/Runtime/Runtime/Form/VRMRequestAccessCompletedForm/" },
                    { text: "In Progress", url: "/Runtime/Runtime/Form/VRMRequestAccessInProgressForm/" }
                ]
            },
            { text: "Archived Records", url: "/Runtime/Runtime/Form/VRMArchivedRecsForm/" }
        ];
    } else if (currentUrl.includes("Letter")) {
        menuItems = [
            { text: "Home", url: "/Runtime/Runtime/Form/LetterLandingForm/" },
            { text: "Tasks List", url: "/Runtime/Runtime/Form/LetterTaskListForm/" },
            { text: "Completed", url: "/Runtime/Runtime/Form/LetterCompletedForm/" },
            { text: "In Progress", url: "/Runtime/Runtime/Form/LetterPendingForm/" }
        ];
    } else if (currentUrl.includes("SAWP") || currentUrl.includes("WorkPermit") || currentUrl.includes("SiteAccess")) {
        if (currentUrl.includes("SAWPInternal")) {
            menuItems = [
                { text: "Home", url: "/Runtime/Runtime/Form/SAWPInternal.LandingForm/" },
                { text: "Tasks List", url: "/Runtime/Runtime/Form/SAWPInternalTaskListForm/" },
                {
                    text: "New Request", url: "", children: [
                        { text: "Site Access", url: "/Runtime/Runtime/Form/SiteAccessRequest.SubmitForm/" },
                        { text: "Work Permit", url: "/Runtime/Runtime/Form/WorkPermit.SubmitForm/" }
                    ]
                },
                { text: "In Progress", url: "/Runtime/Runtime/Form/SAWPInternalInProgressForm/" },
                { text: "Completed", url: "/Runtime/Runtime/Form/SAWPInternalCompletedForm/" }
            ];
        } else if (currentUrl.includes("SAWPExternal") || currentUrl.includes("SAWP.LandingForm")) {
            menuItems = [
                { text: "Home", url: "/Runtime/Runtime/Form/SAWP.LandingForm/" },
                {
                    text: "New Request", url: "", children: [
                        { text: "Site Access", url: "/Runtime/Runtime/Form/SiteAccessRequest.SubmitForm/" },
                        { text: "Work Permit", url: "/Runtime/Runtime/Form/WorkPermit.SubmitForm/" }
                    ]
                },
                { text: "Tasks List", url: "/Runtime/Runtime/Form/SAWPExternalTaskListForm/" },
                { text: "In Progress", url: "/Runtime/Runtime/Form/SAWPExternalInProgressForm/" },
                { text: "Completed", url: "/Runtime/Runtime/Form/SAWPExternalCompletedForm/" }
            ];
        }
    } else if (currentUrl.includes("Visitor")) {
        menuItems = [
            { text: "Home", url: "/Runtime/Runtime/Form/VisitorLandingForm/" },
            { text: "New Request", url: "/Runtime/Runtime/Form/VisitorRegistration.SubmitForm/" },
            { text: "History", url: "/Runtime/Runtime/Form/VisitorHistory.Form/" }
        ];
    } else {
        menuItems = [
            { text: "Home", url: "" },
            { text: "Tasks List", url: "" },
            {
                text: "Create documents", url: "", children: [
                    { text: "In Progress", url: "/in-progress" },
                    { text: "Completed", url: "/completed" }
                ]
            },
            {
                text: "Archive documents", url: "", children: [
                    { text: "In Progress", url: "/in-progress" },
                    { text: "Completed", url: "/completed" }
                ]
            },
            {
                text: "Request access", url: "", children: [
                    { text: "In Progress", url: "/in-progress" },
                    { text: "Completed", url: "/completed" }
                ]
            },
            { text: "Archived", url: "" }
        ];
    }

    // Safeguard
    if (!Array.isArray(menuItems)) {
        console.warn("No valid menuItems found. Skipping sidebar rendering.");
        return;
    }

    // Build menu
    menuItems.forEach(item => {
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;

        const parentLink = $('<a>')
            .attr('href', hasChildren ? 'javascript:void(0)' : item.url)
            .addClass('sidebar-link nav-link')
            .toggleClass('has-children', hasChildren)
            .append($('<span>').text(item.text));

        const itemContainer = $('<div class="sidebar-item"></div>').append(parentLink);

        if (hasChildren) {
            const submenu = $('<div class="sidebar-submenu" style="display:none;"></div>');

            item.children.forEach(sub => {
                const subLink = $('<a>')
                    .attr('href', sub.url)
                    .addClass('sidebar-link sub-link')
                    .append($('<span>').text(sub.text));
                submenu.append(subLink);
            });

            itemContainer.append(submenu);

            parentLink.on('click', function () {
                submenu.slideToggle(200);
                $(".sidebar-link").removeClass("expanded");
                $(this).toggleClass('expanded');
            });
        }

        sidebar.append(itemContainer);
    });

    $('body').append(sidebar);
    $('body').addClass('sidebarVisible');
});

// MutationObserver logic
const targets = document.querySelectorAll('.grid-body-content table.grid-content-table tbody');
if (targets.length > 0) {
    targets.forEach((target) => {
        const observer = new MutationObserver(function () {
            applyGrayscaleFix();
            applyGrayscaleFix2();
            applyGrayscaleFix3();
            applyGrayscaleFix4();
        });
        observer.observe(target, { childList: true, subtree: true });
    });
}

function applyGrayscaleFix() {
    $('.grid-body-content table.grid-content-table tbody tr').each(function (index) {
        const $row = $(this);
        if (index === 0 && $row.find('td').last().find('i[id^="ID1_"]').length === 0) return;

        const fileTypeTd = $row.find('td').eq(2);
        const dataOptions = fileTypeTd.attr('data-options');
        if (!dataOptions) return;
        try {
            const fileType = JSON.parse(dataOptions).value?.toLowerCase();
            if (fileType === 'email') {
                $row.find('i[id^="ID1_"] > img').attr('style', 'filter: grayscale(1) !important; width: 20px; height: 20px; cursor: pointer;');
            }
        } catch (e) {
            console.warn("Invalid JSON in data-options:", dataOptions);
        }
    });
}

function applyGrayscaleFix2() {
    $('.grid-body-content table.grid-content-table tbody tr').each(function (index) {
        const $row = $(this);
        if (index === 0 && $row.find('td').last().find('i[id^="ActionID2_"]').length === 0) return;

        const fileTypeTd = $row.find('td').eq(2);
        const dataOptions = fileTypeTd.attr('data-options');
        if (!dataOptions) return;
        try {
            const fileType = JSON.parse(dataOptions).value?.toLowerCase();
            if (fileType === 'pmo') {
                $row.find('i[id^="ActionID2_"] > img').attr('style', 'filter: grayscale(1) !important; width: 20px; height: 20px; cursor: pointer;');
            }
        } catch (e) {
            console.warn("Invalid JSON in data-options:", dataOptions);
        }
    });
}

function applyGrayscaleFix3() {
    $('.grid-body-content table.grid-content-table tbody tr').each(function (index) {
        const $row = $(this);
        if (index === 0 && $row.find('td').last().find('i[id^="IDAction_"]').length === 0) return;

        const fileTypeTd = $row.find('td').eq(2);
        const dataOptions = fileTypeTd.attr('data-options');
        if (!dataOptions) return;
        try {
            const fileType = JSON.parse(dataOptions).value?.toLowerCase();
            if (fileType === 'pmo') {
                $row.find('i[id^="IDAction_"] > img').attr('style', 'filter: grayscale(1) !important; width: 20px; height: 20px; cursor: pointer;');
            }
        } catch (e) {
            console.warn("Invalid JSON in data-options:", dataOptions);
        }
    });
}

function applyGrayscaleFix4() {
    $('.grid-body-content table.grid-content-table tbody tr').each(function (index) {
        const $row = $(this);
        if (index === 0 && $row.find('td').last().find('i[id^="ActionID6_"]').length === 0) return;

        const fileTypeTd = $row.find('td').eq(2);
        const dataOptions = fileTypeTd.attr('data-options');
        if (!dataOptions) return;
        try {
            const fileType = JSON.parse(dataOptions).value?.toLowerCase();
            if (fileType === '325') {
                $row.find('i[id^="ActionID6_"] > img').attr('style', 'filter: grayscale(1) !important; width: 20px; height: 20px; cursor: pointer;');
            }
        } catch (e) {
            console.warn("Invalid JSON in data-options:", dataOptions);
        }
    });
}


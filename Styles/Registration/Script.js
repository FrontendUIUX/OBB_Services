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

    // Sidebar container
    const sidebar = $('<div id="sidebar" class="sidebar"></div>');

    // Logo section (empty href and src as placeholders)
    const logoContainer = $('<div class="navbarBrand"><a target="_blank"><img src="https://frontenduiux.github.io/OBB_Services/Images/OBBLogo.png" alt="Oman Broad Band"></a></div>');
    const logoLink = $('<a href="#"></a>');
    logoContainer.append(logoLink);
    sidebar.append(logoContainer);

    // Sidebar title
    sidebar.append(`<div class="sidebar-section topic">${isArabic ? "القائمة" : "MENU"}</div>`);

    // Menu items
	
	let menuItems;
    const currentUrl = window.location.href;



if (currentUrl.includes("ArchivingRequest") ||  currentUrl.includes("RAP") || currentUrl.includes("Retrieval") || currentUrl.includes("ArchivingLandingForm")) {
	   menuItems = [
        { text: "Home", url: "/Runtime/Runtime/Form/ArchivingLandingForm/" },
        { text: "Tasks List", url: "/Runtime/Runtime/Form/RAPTaskListForm/" },

        { text: "Completed", url: "/Runtime/Runtime/Form/RAPCompletedForm/" },
        { text: "In Progress", url: "/Runtime/Runtime/Form/RAPInProgressForm/" },
		{ text: "Archived Requests", url: "/Runtime/Runtime/Form/RAPArchivedForm/" }
    ];
	} else if (currentUrl.includes("VRM") || currentUrl.includes("ArchivingDoc") || currentUrl.includes("NewDocCreation") || currentUrl.includes("RequestAccess") || currentUrl.includes("VitalRecordManagement")) {
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
	} else if(currentUrl.includes("Letter")) {
				menuItems = [
        { text: "Home", url: "/Runtime/Runtime/Form/LetterLandingForm/" },
        { text: "Tasks List", url: "/Runtime/Runtime/Form/LetterTaskListForm/" },
        { text: "Completed", url: "/Runtime/Runtime/Form/LetterCompletedForm/" },
        { text: "In Progress", url: "/Runtime/Runtime/Form/LetterPendingForm/" }
    ];
	}else if (currentUrl.includes("SAWP") || currentUrl.includes("WorkPermit") || currentUrl.includes("SiteAccess") || currentUrl.includes("RegistrationRequest.ReviewForm"))
	{
		if (currentUrl.includes("SAWPInternal") || currentUrl.includes("SAWPSiteAccess") || currentUrl.includes("SAWPWorkPermit") || currentUrl.includes("RegistrationRequest.ReviewForm")){
			menuItems = [
				{ text: "Home", url: "/Runtime/Runtime/Form/SAWPInternal.LandingForm/" },
				{ text: "Tasks List", url: "/Runtime/Runtime/Form/SAWPInternalTaskListForm/" },
                {
					text: "New Request", url: "", children: [
						{ text: "Site Access", url: "/Runtime/Runtime/Form/SiteAccessRequest.SubmitForm/" },
						{ text: "Work Permit", url: "/Runtime/Runtime/Form/WorkPermit.SubmitForm/" }
					]
				},
				{
					text: "Site Access", url: "", children: [
						{ text: "In Progress", url: "/Runtime/Runtime/Form/SAWPSiteAccessInternalInProgressForm/" },
						{ text: "Completed", url: "/Runtime/Runtime/Form/SAWPSiteAccessInternalCompletedForm/" }
					]
				},
				{
					text: "Work Permit", url: "", children: [
						{ text: "In Progress", url: "/Runtime/Runtime/Form/SAWPWorkPermitInternalInProgressForm/" },
						{ text: "Completed", url: "/Runtime/Runtime/Form/SAWPWorkPermitInternalCompletedForm/" }
					]
				}
			];		
		}else if (currentUrl.includes("SAWPExternal") || currentUrl.includes("SAWP.LandingForm") || currentUrl.includes("SAWPSiteAccess") || currentUrl.includes("SAWPWorkPermit")){
			menuItems = [
				{ text: "Home", url: "/Runtime/Runtime/Form/SAWP.LandingForm/" },
				{
					text: "New Request", url: "", children: [
						{ text: "Site Access", url: "/Runtime/Runtime/Form/SiteAccessRequest.SubmitForm/" }					]
				},
				{ text: "Tasks List", url: "/Runtime/Runtime/Form/SAWPExternalTaskListForm/" },
				{
					text: "Site Access", url: "", children: [
						{ text: "In Progress", url: "/Runtime/Runtime/Form/SAWPSiteAccessExternalInProgressForm/" },
						{ text: "Completed", url: "/Runtime/Runtime/Form/SAWPSiteAccessExternalCompletedForm/" }
					]
				}
			];
		}
	}else if(currentUrl.includes("Visitor")) {
				menuItems = [
        { text: "Home", url: "/Runtime/Runtime/Form/VisitorLandingForm/" },
        { text: "New Request", url: "/Runtime/Runtime/Form/VisitorRegistration.SubmitForm/" },
        { text: "History", url: "/Runtime/Runtime/Form/VisitorHistory.Form/" }
                ];
    }else if(currentUrl.includes("Feasability") || currentUrl.includes("Master+Data") || currentUrl.includes("My__task__Form") || currentUrl.includes("MyRequestForm") || currentUrl.includes("Feasibility")) {
				menuItems = [
        { text: "Home", url: "/Runtime/Runtime/Form/MyRequestForm/" },
		{ text: "New Request", url: "/Runtime/Runtime/Form/Master+Data/" },
        { text: "Tasks List", url: "/Runtime/Runtime/Form/My__task__Form/" },
        { text: "Completed", url: "/Runtime/Runtime/Form/FeasibilityCompletedRequestForm/" },
        { text: "In Progress", url: "/Runtime/Runtime/Form/FeasibilityPendingRequestForm/" }
    ];
	}else if(currentUrl.includes("Incoming") || currentUrl.includes("Outgoing") || currentUrl.includes("Outing")) {
				menuItems = [
        { text: "Home", url: "/Runtime/Runtime/Form/IncomingRequest.AllRequestsForm/" },
		{
					text: "New Request", url: "", children: [
						{ text: "Incoming Request", url: "/Runtime/Runtime/Form/NewIncomingRequestCreation.SubmitForm/" },
						{ text: "Outgoing Request", url: "/Runtime/Runtime/Form/NewOutingRequestCreation.SubmitForm/" }
					]
		},
        {
					text: "Incoming Correspondence", url: "", children: [
						{ text: "InProgress", url: "/Runtime/Runtime/Form/IncomingRequest.InProgressRequestForm/" },
						{ text: "Closed", url: "/Runtime/Runtime/Form/IncomingRequest.ClosedRequestForm/" },
						{ text: "All Requests", url: "/Runtime/Runtime/Form/IncomingRequest.AllRequestsForm/" },
						{ text: "My Tasks", url: "/Runtime/Runtime/Form/IncomingRequest.Worklist/" },
					]
		},
		{
					text: "Outgoing Correspondence", url: "", children: [
						{ text: "InProgress", url: "/Runtime/Runtime/Form/OutgoingRequest.InProgressRequestForm/" },
						{ text: "My Drafts", url: "/Runtime/Runtime/Form/OutgoingRequest.DraftRequestForm/" },
						{ text: "All Requests", url: "/Runtime/Runtime/Form/OutgoingRequest.AllRequestsForm/" },
						{ text: "My Tasks", url: "/Runtime/Runtime/Form/OutgoingRequest.WorklistForm/" },
					]
		}
    ];
}else{
		menuItems = [
    ];		
	}
    // Build menu
   if(menuItems){
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
   }
   // Append custom sidebar label if available
const customLabelInput = document.querySelector('[name*="customsidebarlabel"]');
if (customLabelInput && customLabelInput.value) {
    const customLink = $('<a>')
        .attr('href', '#') // Change this if you have a specific target URL
        .addClass('sidebar-link nav-link')
        .append($('<span>').text(customLabelInput.value));

    const customItem = $('<div class="sidebar-item"></div>').append(customLink);
    sidebar.append(customItem);
}
    // Add sidebar to body
    $('body').append(sidebar);
    $('body').addClass('sidebarVisible');
});














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
		
		
		
        if (index === 0) {
            const lastTd = $row.find('td').last();
            const lastIcon = lastTd.find('i[id^="ID1_"]');
            if (lastIcon.length === 0) return; // Skip processing if not matching
        }
		
		
		
        const tds = $row.find('td');
        const fileTypeTd = tds.eq(2);
        const dataOptions = fileTypeTd.attr('data-options');
        if (!dataOptions) return;
        
        try {
            const parsed = JSON.parse(dataOptions);
            const fileType = (parsed.value || "").toLowerCase();

            if (fileType === 'email') {
                const img = $row.find('i[id^="ID1_"] > img');
                img.attr('style', 'filter: grayscale(1) !important; width: 20px; height: 20px; cursor: pointer;');
            }
        } catch (e) {
            console.warn("Invalid JSON in data-options:", dataOptions);
        }
    });
}



function applyGrayscaleFix2() {
    $('.grid-body-content table.grid-content-table tbody tr').each(function (index) {
        const $row = $(this);
		
		
		
        if (index === 0) {
            const lastTd = $row.find('td').last();
            const lastIcon = lastTd.find('i[id^="ActionID2_"]');
            if (lastIcon.length === 0) return; // Skip processing if not matching
        }
		
		
		
        const tds = $row.find('td');
        const fileTypeTd = tds.eq(2);
        const dataOptions = fileTypeTd.attr('data-options');
        if (!dataOptions) return;
        
        try {
            const parsed = JSON.parse(dataOptions);
            const fileType = (parsed.value || "").toLowerCase();
            
            if (fileType === 'pmo') {
                const img = $row.find('i[id^="ActionID2_"] > img');
                img.attr('style', 'filter: grayscale(1) !important; width: 20px; height: 20px; cursor: pointer;');
            }
        } catch (e) {
            console.warn("Invalid JSON in data-options:", dataOptions);
        }
    });
}


function applyGrayscaleFix3() {
    $('.grid-body-content table.grid-content-table tbody tr').each(function (index) {
        const $row = $(this);
		
		
		
		
        if (index === 0) {
            const lastTd = $row.find('td').last();
            const lastIcon = lastTd.find('i[id^="IDAction_"]');
            if (lastIcon.length === 0) return; // Skip processing if not matching
        }
		
		
        const tds = $row.find('td');
        const fileTypeTd = tds.eq(2);
        const dataOptions = fileTypeTd.attr('data-options');
        if (!dataOptions) return;
        
        try {
            const parsed = JSON.parse(dataOptions);
            const fileType = (parsed.value || "").toLowerCase();

            if (fileType === 'pmo') {
                const img = $row.find('i[id^="IDAction_"] > img');
                img.attr('style', 'filter: grayscale(1) !important; width: 20px; height: 20px; cursor: pointer;');
            }
        } catch (e) {
            console.warn("Invalid JSON in data-options:", dataOptions);
        }
    });
}


function applyGrayscaleFix4() {
    $('.grid-body-content table.grid-content-table tbody tr').each(function (index) {
        const $row = $(this);
		
		
		
		
        if (index === 0) {
            const lastTd = $row.find('td').last();
            const lastIcon = lastTd.find('i[id^="ActionID6_"]');
            if (lastIcon.length === 0) return; // Skip processing if not matching
        }
		
		
        const tds = $row.find('td');
        const fileTypeTd = tds.eq(2);
        const dataOptions = fileTypeTd.attr('data-options');
        if (!dataOptions) return;
        
        try {
            const parsed = JSON.parse(dataOptions);
            const fileType = (parsed.value || "").toLowerCase();

            if (fileType === '325') {
				
                const img = $row.find('i[id^="ActionID6_"] > img');
                img.attr('style', 'filter: grayscale(1) !important; width: 20px; height: 20px; cursor: pointer;');
            }
        } catch (e) {
            console.warn("Invalid JSON in data-options:", dataOptions);
        }
    });
}


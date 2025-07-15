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

if (currentUrl.includes("Archiving") ||  currentUrl.includes("RAP") || currentUrl.includes("Retrieval")) {
	   menuItems = [
        { text: "Home", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/ArchivingLandingForm/" },
        { text: "Tasks List", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/RAPTaskListForm/" },

        { text: "Completed", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/RAPCompletedForm/" },
        { text: "In Progress", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/RAPInProgressForm/" },
		{ text: "Archived Requests", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/RAPArchivedForm/" }
    ];
	} else if (currentUrl.includes("VRM")  ) {
		menuItems = [
        { text: "Home", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/VRM.LandingForm/" },
        { text: "Tasks List", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/VRMTaskListForm/" },
        { text: "Completed", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/VRMCompletedForm/" },
		{ text: "In Progress", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/VRMInProgressForm/" },
        { text: "Archived Records", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/VRMArchivedRecsForm/" }
    ];
	} else if(currentUrl.includes("Letter")) {
				menuItems = [
        { text: "Home", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/LetterLandingForm/" },
        { text: "Tasks List", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/LetterTaskListForm/" },
        { text: "Completed", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/LetterCompletedForm/" },
        { text: "In Progress", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/LetterPendingForm/" }
    ];
	}else if (currentUrl.includes("SAWP"))
	{
		if (currentUrl.includes("SAWPInternal")){
			menuItems = [
				{ text: "Home", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/SAWPInternal.LandingForm/" },
				{ text: "Tasks List", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/SAWPInternalTaskListForm/" },
                {
					text: "New Request", url: "", children: [
						{ text: "Site Access", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/SiteAccessRequest.SubmitForm/" },
						{ text: "Work Permit", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/WorkPermit.SubmitForm/" }
					]
				},
				{ text: "In Progress", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/SAWPInternalInProgressForm/" },
				{ text: "Completed", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/SAWPInternalCompletedForm/" }
			];		
		}else if (currentUrl.includes("SAWPExternal") || currentUrl.includes("SAWP.LandingForm")){
			menuItems = [
				{ text: "Home", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/SAWP.LandingForm/" },
				{
					text: "New Request", url: "", children: [
						{ text: "Site Access", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/SiteAccessRequest.SubmitForm/" },
						{ text: "Work Permit", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/WorkPermit.SubmitForm/" }
					]
				},
				{ text: "Tasks List", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/SAWPExternalTaskListForm/" },
				{ text: "In Progress", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/SAWPExternalInProgressForm/" },
				{ text: "Completed", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/SAWPExternalCompletedForm/" }
			];
		}
	}else if(currentUrl.includes("Visitor")) {
				menuItems = [
        { text: "Home", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/VisitorLandingForm/" },
        { text: "New Request", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/VisitorRegistration.SubmitForm/" },
        { text: "History", url: "https://win-0q5t2palbof/Runtime/Runtime/Form/VisitorHistory.Form/" }
                ];
    }
    else{
		
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
    //
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



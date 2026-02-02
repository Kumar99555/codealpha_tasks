document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const newProjectBtn = document.querySelector('.new-project-btn');
    const modal = document.getElementById('newProjectModal');
    const closeModal = document.querySelector('.close-modal');
    const newProjectForm = document.getElementById('newProjectForm');

    newProjectBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Form submission
    newProjectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const projectName = document.getElementById('projectName').value;
        const projectDeadline = document.getElementById('projectDeadline').value;
        
        const projectsContainer = document.querySelector('.projects');
        const newProject = document.createElement('div');
        newProject.className = 'project';
        newProject.innerHTML = `
            <h3>${projectName}</h3>
            <div class="project-meta">
                <span class="deadline"><i class="far fa-calendar-alt"></i> Due: ${new Date(projectDeadline).toLocaleDateString()}</span>
                <span class="members"><i class="fas fa-users"></i> 1</span>
                <span class="status not-started">Not Started</span>
            </div>
            <div class="progress-bar">
                <div class="progress" style="width: 0%;"></div>
            </div>
            <div class="tasks">
                <div class="task">
                    <input type="checkbox">
                    <span>Add first task</span>
                </div>
            </div>
            <div class="project-actions">
                <button><i class="far fa-comment"></i> 0</button>
                <button><i class="fas fa-paperclip"></i> 0</button>
                <button><i class="fas fa-ellipsis-h"></i></button>
            </div>
        `;
        
        projectsContainer.appendChild(newProject);
        modal.style.display = 'none';
        newProjectForm.reset();
        
        // Add task completion functionality
        const tasks = newProject.querySelectorAll('.task input[type="checkbox"]');
        tasks.forEach(task => {
            task.addEventListener('change', updateProjectProgress);
        });
    });

    // Task completion functionality
    const tasks = document.querySelectorAll('.task input[type="checkbox"]');
    tasks.forEach(task => {
        task.addEventListener('change', updateProjectProgress);
    });

    function updateProjectProgress() {
        const project = this.closest('.project');
        const tasks = project.querySelectorAll('.task');
        const completedTasks = project.querySelectorAll('.task input[type="checkbox"]:checked');
        
        const progress = (completedTasks.length / tasks.length) * 100;
        project.querySelector('.progress').style.width = `${progress}%`;
        
        const status = project.querySelector('.status');
        if (progress === 100) {
            status.textContent = 'Completed';
            status.className = 'status completed';
        } else if (progress > 0) {
            status.textContent = 'In Progress';
            status.className = 'status in-progress';
        } else {
            status.textContent = 'Not Started';
            status.className = 'status not-started';
        }
    }
});
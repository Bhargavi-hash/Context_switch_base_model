// ***** Defining constants ***** //

index = 0;                  // process index
int_index = 0;              // interrupt index
CPU_status = 0;             // 0: idle, 1: busy
Dispatcher_Status = 0;      // 0: idle, 1: busy
NMI_Status = 0;             // 0: idle, 1: busy
IO_status = 0;              // 0: idle, 1: busy
PF_status = 0;              // 0: idle, 1: busy

IO_count = 0;               // IO count
PF_count = 0;               // Page fault count

var processPool = new Array();
var InterruptPool = new Array();

// ***** Defining tables ***** //

var ReadyPooltable = document.getElementById("ReadyPool");
var DispatcherTable = document.getElementById("dispatcher");
var CPUtable = document.getElementById("myCPU");
var Terminationtable = document.getElementById("TerminationPool");
var IOtable = document.getElementById("IO");
var PFtable = document.getElementById("PF");



// ****** Helper functions ****** //

function remove_from_CPU() {
    var CPUtable = document.getElementById("myCPU");

    // Error handling
    if (CPU_status == 0) {
        console.log("CPU is empty");
        return false;
    }

    CPUtable.deleteRow(-1);
    CPU_status = 0;
    console.log("CPU row deleted");
}

function Add_to_IO(array) {
    
    var IOtable = document.getElementById("IO");
    var row = IOtable.insertRow(-1);
    var cell0 = row.insertCell(0);  // pid
    var cell1 = row.insertCell(1);  // status
    
    array[1] = "waiting";
    
    cell0.innerHTML = array[0];
    cell1.innerHTML = array[1];
    
    // IO_status = 0;
    // remove_from_CPU();
}

function remove_from_dispatcher() {
    // Error handling
    if (Dispatcher_Status == 0) {
        console.log("Dispatcher is empty");
        return false;
    }

    var DispatcherTable = document.getElementById("dispatcher");
    DispatcherTable.deleteRow(2);
    Dispatcher_Status = 0;
    console.log("dispatcher row deleted");
}

function Add_To_Ready_Pool(array) {

    var ReadyPooltable = document.getElementById("ReadyPool");
    var row = ReadyPooltable.insertRow(-1);
    var cell0 = row.insertCell(0);  // pid
    var cell1 = row.insertCell(1);  // status
    var cell2 = row.insertCell(2);  // PC

    array[1] = "ready";

    cell0.innerHTML = array[0];
    cell1.innerHTML = array[1];
    cell2.innerHTML = array[2];
}

function find_process(pid) {
    for (var i = 0; i < processPool.length; i++) {
        if (processPool[i][0] == pid) {
            return processPool[i];
        }
    }
}

function CreateNewProcess() {

    var ReadyPooltable = document.getElementById("ReadyPool");
    var row = ReadyPooltable.insertRow(-1);
    var cell0 = row.insertCell(0);  // pid
    var cell1 = row.insertCell(1);  // status
    var cell2 = row.insertCell(2);  // PC

    // Create a new process
    var array = new Array();
    array[0] = "pid" + index++;
    array[1] = "ready";
    array[2] = "0x000";
    array[3] = "0%";

    processPool.push(array);    // add to process pool

    cell0.innerHTML = array[0];
    cell1.innerHTML = array[1];
    cell2.innerHTML = array[2];
}

function To_Dispatcher() {

    var ReadyPooltable = document.getElementById("ReadyPool");
    var pid = ReadyPooltable.rows[2].cells[0].innerHTML;
    // Search the process pool to find the pid
    process = find_process(pid);

    ret_value = Add_to_dispatcher(process);
    if (ret_value == true) {
        // Delete the process from the ready pool
        ReadyPooltable.deleteRow(2);
    }
}

function Add_to_dispatcher(array) {

    if (Dispatcher_Status == 1) {
        return false;
    }

    var DispatcherTable = document.getElementById("dispatcher");
    var row = DispatcherTable.insertRow(-1);
    var cell0 = row.insertCell(0);  // pid
    var cell1 = row.insertCell(1);  // status
    var cell2 = row.insertCell(2);  // PC

    cell0.innerHTML = array[0];
    cell1.innerHTML = array[1];
    cell2.innerHTML = array[2];

    Dispatcher_Status = 1;
    return true;
}

function ToCPU() {

    // Error handling
    if (Dispatcher_Status == 0) {
        console.log("Dispatcher is empty");
        return false;
    }

    var DispatcherTable = document.getElementById("dispatcher");
    var CPUtable = document.getElementById("myCPU");

    var pid = DispatcherTable.rows[2].cells[0].innerHTML;
    var array = find_process(pid);
    var CPU_array;

    DispatcherTable.deleteRow(2);
    Dispatcher_Status = 0;
    console.log(pid + " dispatched to CPU");

    if (CPU_status == 1) {
        // Get the current process in the CPU
        var CPU_pid = CPUtable.rows[2].cells[0].innerHTML;
        CPU_array = find_process(CPU_pid);

        remove_from_CPU();
        Add_To_Ready_Pool(CPU_array);
    }

    CPU_status = 0;
    Add_to_CPU(array);
}

function Add_to_CPU(array) {

    var CPUtable = document.getElementById("myCPU");
    var row = CPUtable.insertRow(2);
    var cell0 = row.insertCell(0);  // pid
    var cell1 = row.insertCell(1);  // status
    var cell2 = row.insertCell(2);  // PC
    var cell3 = row.insertCell(3);  // execution percentage

    array[1] = "running";

    cell0.innerHTML = array[0];
    cell1.innerHTML = array[1];
    cell2.innerHTML = array[2];
    cell3.innerHTML = array[3];

    CPU_status = 1;

    // Increase percentage by 10 every 1 second.
    var interval = setInterval(function () {
        // Stop in case of NMI signal detected.
        if (NMI_Status == 1) {
            console.log("NMI signal detected");
            clearInterval(interval);
            return;
        }

        // Stop in case of PF signal detected.
        if (PF_status == 1) {
            console.log("PF signal detected");
            clearInterval(interval);
            return;
        }

        // Stop in case of IO signal detected.
        // if (IO_status == 1) {
        //     console.log("IO signal detected");
        //     clearInterval(interval);
        //     return;
        // }

        var percentage = parseInt(array[3].substring(0, array[3].length - 1));
        if (percentage < 100) {
            percentage += 10;
            array[3] = percentage + "%";

            // Increase PC by 4
            var PC = parseInt(array[2].substring(2), 16);
            PC += 4;
            array[2] = "0x" + PC.toString(16);
            cell2.innerHTML = array[2];
            cell3.innerHTML = array[3];
        }
        else {
            clearInterval(interval);
            // Send the process to Termination pool.
            remove_from_CPU();
            CPU_status = 0;

            send_to_termination_pool(array);
        }
    }, 1000);

    // // Send the process to Termination pool.
    // remove_from_CPU();
    // CPU_status = 0;

    // send_to_termination_pool(array);
}

function IO_INT() {

    console.log("IO needed");
    IO_status = 1;

    if (CPU_status == 0) {
        console.log("CPU is empty");
        return;
    }

    var CPUtable = document.getElementById("myCPU");
    var CPUpid = CPUtable.rows[2].cells[0].innerHTML;
    var CPUarray = find_process(CPUpid);

    remove_from_CPU();
    Add_to_IO(CPUarray);
}

function IO_done() {
    var IOtable = document.getElementById("IO");
    // if no process in IO --> return
    if (IOtable.rows.length == 2) {
        console.log("IO is empty");
        return;
    }

    var IOpid = IOtable.rows[2].cells[0].innerHTML;
    var IOarray = find_process(IOpid);

    Add_To_Ready_Pool(IOarray);
    IOtable.deleteRow(2);

    return;
}


function send_to_termination_pool(element) {

    if (CPU_status == 0) {
        console.log("CPU is empty");
        return;
    }
    var Terminationtable = document.getElementById("TerminationPool");
    var row = Terminationtable.insertRow(-1);
    var cell0 = row.insertCell(0);  // pid

    cell0.innerHTML = element[0];
}

function PF_INT() {
    if (PF_status == 1) {
        return;
    }
    
    PF_status = 1;

    if (CPU_status == 0) {
        console.log("CPU is empty");
        return;
    }

    var CPUtable = document.getElementById("myCPU");
    var CPUpid = CPUtable.rows[2].cells[0].innerHTML;
    var CPUarray = find_process(CPUpid);

    var PFrow = CPUtable.insertRow(-1);
    var PFcell0 = PFrow.insertCell(0);  // pid
    var PFcell1 = PFrow.insertCell(1);  // status
    var PFcell2 = PFrow.insertCell(2);  // PC
    var PFcell3 = PFrow.insertCell(3);  // execution percentage

    var PFinterrupt = new Array();
    PFinterrupt[0] = "PF";
    PFinterrupt[1] = "running";
    PFinterrupt[2] = "ISR";
    PFinterrupt[3] = "0%";

    InterruptPool.push(PFinterrupt);

    PFcell0.innerHTML = PFinterrupt[0];
    PFcell1.innerHTML = PFinterrupt[1];
    PFcell2.innerHTML = PFinterrupt[2];
    PFcell3.innerHTML = PFinterrupt[3];

    // Increase percentage by 20 every 1 second.
    var interval = setInterval(function () {
        // If NMI signal detected, stop the process.
        if (NMI_Status == 1) {
            clearInterval(interval);
            return;
        }

        // Stop in case of interrupt signal detected.
        var percentage = parseInt(PFinterrupt[3].substring(0, PFinterrupt[3].length - 1));
        if (percentage < 100) {
            percentage += 20;
            PFinterrupt[3] = percentage + "%";
            PFcell3.innerHTML = PFinterrupt[3];
        }
        else {
            clearInterval(interval);
            // Send the process to Termination pool.
            CPUtable.deleteRow(-1);
            CPUtable.deleteRow(-1);

            PF_status = 0;
            CPU_status = 0;

            Add_to_CPU(CPUarray);

            // send_to_termination_pool(PFinterrupt);
        }
    }, 1000);

}

function NMI() {

    // Remove PF signals if NMI occurs
    if (PF_status == 1 && NMI_Status == 0) { 
        PF_status = 0;
        remove_from_CPU();
        CPU_status = 1;
        // return; 
    }

    // Ignore all other NMI signals if one is already detected.
    if (NMI_Status == 1) {
        return;
    }

    NMI_Status = 1;

    // Delete the process from the CPU
    var CPUtable = document.getElementById("myCPU");

    if (CPU_status == 1) {
        // Get the pid running
        var pid = CPUtable.rows[2].cells[0].innerHTML;
        // Search the process pool to find the pid
        var array = find_process(pid);

        Add_To_Ready_Pool(array);
        remove_from_CPU();
        CPU_status = 0;
    }

    CPU_status = 1;

    var int_row = CPUtable.insertRow(-1);
    var int_cell0 = int_row.insertCell(0);  // pid
    var int_cell1 = int_row.insertCell(1);  // status
    var int_cell2 = int_row.insertCell(2);  // PC
    var int_cell3 = int_row.insertCell(3);  // execution percentage

    var interrupt = new Array();
    interrupt[0] = "int_id" + int_index++;
    interrupt[1] = "running";
    interrupt[2] = "NMI_ISR";
    interrupt[3] = "0%";


    // Add this to interrupt pool
    InterruptPool.push(interrupt);

    int_cell0.innerHTML = interrupt[0];
    int_cell1.innerHTML = interrupt[1];
    int_cell2.innerHTML = interrupt[2];
    int_cell3.innerHTML = interrupt[3];

    // Increase percentage by 20 as long as it is less than 100
    var Int_timer = setInterval(function () {
        var Interrupt_percent = parseInt(interrupt[3].substring(0, interrupt[3].length - 1));
        if (Interrupt_percent < 100) {
            Interrupt_percent += 20;
            interrupt[3] = Interrupt_percent + "%";
            int_cell3.innerHTML = interrupt[3];
        }
        else {
            clearInterval(Int_timer);
            // Send to termination pool
            send_to_termination_pool(interrupt);
            // Delete the process from the CPU
            remove_from_CPU();
            CPU_status = 0;
            NMI_Status = 0;
            return;
        }
    }, 1000);

}

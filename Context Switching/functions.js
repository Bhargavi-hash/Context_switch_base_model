var st_IR = 0;
var st_PC = 1;

var nd_IR = 0;
var nd_PC = 1;

var timerInterrupt = 0;
var InterruptRead = 0;
var ctxtSwitch = 0;

var start_simulation = 0;

function loadNext() {

    if (ctxtSwitch == 3) {

        if (start_simulation == 0) return;

        var asm = document.getElementById("asmInstructions");
        var stack = document.getElementById("stack");

        var regs;

        if (nd_IR == 11) {
            regs = "%rsp, %rbp, %rax, %eax, %rsi, %rdi";
        }
        else if (nd_IR == 12) {
            regs = "%rsp, %rbp, %rax, %eax, %rsi, %rdi";
        }
        else if (nd_IR == 13) {
            regs = "%rsp, %rbp, %rax, %eax, %rsi, %rdi";
        }
        else if (nd_IR == 14) {
            regs = "%rsp, %rbp, %rax, %eax, %rsi, %rdi";
            var row = stack.insertRow(-1);
            cell = row.insertCell(0);
            cell.innerHTML = "%eax in -12(%rbp)";
        }
        else if (nd_IR == 15) {
            regs = "%rsp, %rbp, %rax";
            var row = stack.insertRow(-1);
            cell = row.insertCell(0);
            cell.innerHTML = "%rdx in -8(%rbp)";
        }
        else if (nd_IR == 16) {
            regs = "%rsp, %rbp, %rax, %eax, %rsi, %rdi";
        }
        else if (nd_IR == 17) {
            regs = "%rsp, %rbp, %rax, %eax, %rsi, %rdi";
        }
        else if (nd_IR == 18) {
            regs = "%rsp, %rbp, %rax, %eax, %rsi, %rdi";
        }
        else if (nd_IR == 19) {
            regs = "%rsp, %rbp, %rax, %eax, %rsi, %rdi";
        }
        else if (nd_IR == 20) {
            regs = "%rsp, %rbp, %rax, %eax, %rsi, %rdi";
        }
        else if (nd_IR == 21) {
            regs = " - ";
        }

        // asm.rows[11].style.backgroundColor = "white";
        if (nd_IR > 0) asm.rows[nd_IR-9].style.backgroundColor = "white";
        asm.rows[nd_IR-8].style.backgroundColor = "yellow";

        var details = document.getElementById("details");
        details.rows[0].cells[1].innerHTML = nd_IR++;
        details.rows[1].cells[1].innerHTML = nd_PC++;

        if (nd_IR == 18) 
        {
            nd_IR = 20;
            asm.rows[9].style.backgroundColor = "white";
            asm.rows[12].style.backgroundColor = "yellow";
        }
            
        if (nd_IR == 0) nd_PC = 1;
        var mode_details = document.getElementById("mode-details");
        mode_details.rows[0].cells[1].innerHTML = "1";

        var reg_details = document.getElementById("reg-details");
        reg_details.rows[0].cells[1].innerHTML = regs;

    }

    if (ctxtSwitch == 2) {
        console.log("ctxtSwitch == 2");

        if (start_simulation == 0) return;

        var asm = document.getElementById("asmInstructions");
        var stack = document.getElementById("stack");

        var regs;
        if (st_IR == 0) {
            regs = "%rbp";
            stack.deleteRow(-1);
            var row = stack.insertRow(-1);
            cell = row.insertCell(0);
            cell.innerHTML = "%rbp";
        }
        else if (st_IR == 1) {
            regs = "%rsp, %rsp";
        }
        else if (st_IR == 2) {
            regs = "%rbp, %rsp";
            var row = stack.insertRow(-1);
            cell = row.insertCell(0);
            cell.innerHTML = "$5 in -8(%rbp)";
        }
        else if (st_IR == 3) {
            regs = "%rsp, %rbp, %eax";
        }
        else if (st_IR == 4) {
            regs = "%rsp, %rbp, %eax";
        }
        else if (st_IR == 5) {
            regs = "%rsp, %rbp, %eax";
            var row = stack.insertRow(-1);
            cell = row.insertCell(0);
            cell.innerHTML = "%eax in -4(%rbp)";
        }
        else if (st_IR == 6) {
            regs = "%rsp, %rbp, %eax";
        }
        else if (st_IR == 7) {
            regs = " %eax ";
            stack.deleteRow(-1);
            stack.deleteRow(-1);
            stack.deleteRow(-1);
            var row = stack.insertRow(-1);
            cell = row.insertCell(0);
            cell.innerHTML = "Stack";
        }
        else if (st_IR == 8) {
            regs = " - ";
            implicitExit();
        }

        asm.rows[9].style.backgroundColor = "white";
        if (st_IR > 0) asm.rows[st_IR].style.backgroundColor = "white";
        asm.rows[st_IR + 1].style.backgroundColor = "yellow";

        console.log("st_IR = " + st_IR);
        var details = document.getElementById("details");
        details.rows[0].cells[1].innerHTML = st_IR++;

        if (st_IR == 9) {
            st_IR = 0;
            st_PC = 8;
        }
        details.rows[1].cells[1].innerHTML = st_PC++;
        if (st_IR == 0) st_PC = 1;
        var mode_details = document.getElementById("mode-details");
        mode_details.rows[0].cells[1].innerHTML = "1";

        var reg_details = document.getElementById("reg-details");
        reg_details.rows[0].cells[1].innerHTML = regs;

    }

    if (ctxtSwitch == 1) {

        if (start_simulation == 0) return;

        var asm = document.getElementById("asmInstructions");
        var stack = document.getElementById("stack");

        var regs;
        if (nd_IR == 0) {
            regs = "%rbp";
            stack.deleteRow(-1);
            var row = stack.insertRow(-1);
            cell = row.insertCell(0);
            cell.innerHTML = "%rbp";
        }
        else if (nd_IR == 1) {
            regs = "%rsp, %rsp";
        }
        else if (nd_IR == 2) {
            regs = "%rbp, %rsp";
        }
        else if (nd_IR == 3) {
            regs = "%rsp, %rbp, %rax";
        }
        else if (nd_IR == 4) {
            regs = "%rsp, %rbp, %rax";
            var row = stack.insertRow(-1);
            cell = row.insertCell(0);
            cell.innerHTML = "%rax in -8(%rbp)";
        }
        else if (nd_IR == 5) {
            regs = "%rsp, %rbp, %rax, %eax";
        }
        else if (nd_IR == 6) {
            regs = "%rsp, %rbp, %rax, %eax";
        }
        else if (nd_IR == 7) {
            regs = "%rsp, %rbp, %rax, %eax, %rsi";
        }
        else if (nd_IR == 8) {
            regs = "%rsp, %rbp, %rax, %eax, %rsi, %rdi";
        }
        else if (nd_IR == 9) {
            regs = "%rsp, %rbp, %rax, %eax, %rsi, %rdi";
        }
        else if (nd_IR == 10) {
            regs = "%rsp, %rbp, %rax, %eax, %rsi, %rdi";
            softwareInterruptRead();
            return;
        }

        asm.rows[11].style.backgroundColor = "white";
        if (nd_IR > 0) asm.rows[nd_IR].style.backgroundColor = "white";
        asm.rows[nd_IR + 1].style.backgroundColor = "yellow";

        var details = document.getElementById("details");
        details.rows[0].cells[1].innerHTML = nd_IR++;

        // if (nd_IR == 9) {
        //     st_IR = 0;
        //     st_PC = 8;
        // }
        details.rows[1].cells[1].innerHTML = nd_PC++;
        if (nd_IR == 0) nd_PC = 1;
        var mode_details = document.getElementById("mode-details");
        mode_details.rows[0].cells[1].innerHTML = "1";

        var reg_details = document.getElementById("reg-details");
        reg_details.rows[0].cells[1].innerHTML = regs;

    }

    if (ctxtSwitch == 0) {

        if (start_simulation == 0) return;

        var asm = document.getElementById("asmInstructions");
        var stack = document.getElementById("stack");

        var regs;
        if (st_IR == 0) {
            regs = "%rbp";
            stack.deleteRow(-1);
            var row = stack.insertRow(-1);
            cell = row.insertCell(0);
            cell.innerHTML = "%rbp";
        }
        else if (st_IR == 1) {
            regs = "%rsp, %rsp";
        }
        else if (st_IR == 2) {
            regs = "%rbp, %rsp";
            var row = stack.insertRow(-1);
            cell = row.insertCell(0);
            cell.innerHTML = "$5 in -8(%rbp)";
        }
        else if (st_IR == 3) {
            regs = "%rsp, %rbp, %eax";
        }
        else if (st_IR == 4) {
            regs = "%rsp, %rbp, %eax";
            TimerInterrupt();
            return;
        }
        else if (st_IR == 5) {
            regs = "%rsp, %rbp, %eax";
            var row = stack.insertRow(-1);
            cell = row.insertCell(0);
            cell.innerHTML = "%eax in -4(%rbp)";
        }
        else if (st_IR == 6) {
            regs = "%rsp, %rbp, %eax";
        }
        else if (st_IR == 7) {
            regs = " %eax ";
            stack.deleteRow(-1);
            stack.deleteRow(-1);
            stack.deleteRow(-1);
            var row = stack.insertRow(-1);
            cell = row.insertCell(0);
            cell.innerHTML = "Stack";
        }
        else if (st_IR == 8) {
            regs = " - ";
        }

        asm.rows[9].style.backgroundColor = "white";
        if (st_IR > 0) asm.rows[st_IR].style.backgroundColor = "white";
        asm.rows[st_IR + 1].style.backgroundColor = "yellow";

        var details = document.getElementById("details");
        details.rows[0].cells[1].innerHTML = st_IR++;

        if (st_IR == 9) {
            st_IR = 0;
            st_PC = 8;
        }
        details.rows[1].cells[1].innerHTML = st_PC++;
        if (st_IR == 0) st_PC = 1;
        var mode_details = document.getElementById("mode-details");
        mode_details.rows[0].cells[1].innerHTML = "1";

        var reg_details = document.getElementById("reg-details");
        reg_details.rows[0].cells[1].innerHTML = regs;
    }

}

function start() {

    if (start_simulation == 1) {
        location.reload();
        start_simulation = 0;
        return;
    }

    start_simulation = 1;

    var PCB = document.getElementById("PCB");
    PCB.rows[2].cells[1].innerHTML = "Running";
    PCB.rows[4].cells[1].innerHTML = "0";

    var details = document.getElementById("details");
    details.rows[0].cells[1].innerHTML = "0";
    details.rows[1].cells[1].innerHTML = "1";
}

function implicitExit() {
    var PCB = document.getElementById("PCB");
    PCB.rows[1].cells[1].innerHTML = "pid0";
    PCB.rows[2].cells[1].innerHTML = "Terminated";
    PCB.rows[4].cells[1].innerHTML = " - ";

    var details = document.getElementById("details");
    details.rows[0].cells[1].innerHTML = " $$$ ";
    details.rows[1].cells[1].innerHTML = " $$$ ";

    var mode_details = document.getElementById("mode-details");
    mode_details.rows[0].cells[1].innerHTML = "0";
    mode_details.rows[1].cells[1].innerHTML = "1";

    var reg_details = document.getElementById("reg-details");
    reg_details.rows[0].cells[1].innerHTML = " ..... ";

    var table = document.getElementById("asmInstructions");
    table.rows[9].style.backgroundColor = "red";
    table.rows[8].style.backgroundColor = "white";

    var intTable = document.getElementById("int");
    intTable.rows[0].cells[1].innerHTML = "int 0x00 - exit()";

    var memTable = document.getElementById("Memory");
    var memRow = memTable.insertRow(-1);
    var cell = memRow.insertCell(0);
    cell.innerHTML = "pid0";

    // Change kernel color to red
    var kernel = document.getElementById("kernel");
    kernel.style.backgroundColor = "red";
    var kp = document.getElementById("k-p");
    // Handle the timer interrupt for 4 seconds and update the contents for every 1 second
    var i = 0;
    var interval = setInterval(function () {
        dots = "";
        for (var j = 0; j < i; j++) dots += ".";
        kp.innerHTML = "Handling read Interrupt and context switching" + dots;
        i++;
        if (i == 5) {
            clearInterval(interval);
            ctxtSwitch = 3;
            runNewP1();
        }
    }, 1000);        
}

function runNewP1() {
    var PCB = document.getElementById("PCB");
    PCB.rows[1].cells[1].innerHTML = "pid1";
    PCB.rows[2].cells[1].innerHTML = "Running";
    PCB.rows[4].cells[1].innerHTML = "0";

    var details = document.getElementById("details");
    nd_IR = nd_IR + 1;
    details.rows[0].cells[1].innerHTML = nd_IR;
    nd_PC = nd_PC + 1;
    details.rows[1].cells[1].innerHTML = nd_PC;


    var mode_details = document.getElementById("mode-details");
    mode_details.rows[0].cells[1].innerHTML = "1";
    mode_details.rows[1].cells[1].innerHTML = "0";

    var reg_details = document.getElementById("reg-details");
    reg_details.rows[0].cells[1].innerHTML = "%rsp, %rbp, %rax, %eax, %rsi, %rdi";

    // var table = document.getElementById("asmInstructions");
    // table.rows[12].style.backgroundColor = "yellow";
    // table.rows[11].style.backgroundColor = "white";

    var intTable = document.getElementById("int");
    intTable.rows[0].cells[1].innerHTML = " - ";

    var memTable = document.getElementById("Memory");
    var memRow = memTable.deleteRow(1);
    

    // Change kernel color to red
    var kernel = document.getElementById("kernel");
    kernel.style.backgroundColor = "green";
    var kp = document.getElementById("k-p");
    kp.innerHTML = "kernel";

    var asmTable = document.getElementById("asmInstructions");

    for (var i = 0; i < 9; i++) {
        asmTable.deleteRow(-1);
    }
    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "....";
    cell1.innerHTML = "... .... .... ....";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "010.";
    cell1.innerHTML = "call __scanf@PLT";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "011.";
    cell1.innerHTML = "movl -16(%rbp), %eax";
    asmRow.style.backgroundColor = "yellow";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "012.";
    cell1.innerHTML = "addl $5, %eax";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "013.";
    cell1.innerHTML = "movl %eax, -12(%rbp)";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "014.";
    cell1.innerHTML = "movl -12(%rbp), %eax";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "015.";
    cell1.innerHTML = "movl -8(%rbp), %rdx";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "016.";
    cell1.innerHTML = "xorq %fs:40, %rdx";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "017.";
    cell1.innerHTML = "je .L3";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "018.";
    cell1.innerHTML = "call __stack_chk_fail";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell0.innerHTML = "L3:";
    cell1 = asmRow.insertCell(1);
    cell1.innerHTML = "leave";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell0.innerHTML = "021.";
    cell1 = asmRow.insertCell(1);
    cell1.innerHTML = "ret";
}

function softwareInterruptRead() {
    if (InterruptRead == 1) {
        // timerInterrupt = 0;
        return;
    }

    InterruptRead = 1;

    var asmTable = document.getElementById("asmInstructions");
    asmTable.rows[11].style.backgroundColor = "red";
    asmTable.rows[10].style.backgroundColor = "white";

    var details = document.getElementById("details");
    details.rows[0].cells[1].innerHTML = "$$$";
    details.rows[1].cells[1].innerHTML = "$$$";

    var mode_details = document.getElementById("mode-details");
    mode_details.rows[0].cells[1].innerHTML = "0";
    mode_details.rows[1].cells[1].innerHTML = "1";

    var reg_details = document.getElementById("reg-details");
    reg_details.rows[0].cells[1].innerHTML = " ..... ";

    var table = document.getElementById("int");
    table.rows[0].cells[1].innerHTML = "int 0x80 - read()";

    var PCB = document.getElementById("PCB");
    PCB.rows[2].cells[1].innerHTML = "Ready";
    PCB.rows[4].cells[1].innerHTML = "11";

    var stack = document.getElementById("stack");
    stack.deleteRow(-1);
    stack.deleteRow(-1);
    var stackRow = stack.insertRow(-1);
    cell = stackRow.insertCell(0);
    cell.innerHTML = "Stack";

    var memTable = document.getElementById("Memory");
    var memRow = memTable.insertRow(-1);
    var cell = memRow.insertCell(0);
    cell.innerHTML = "pid1";

    // Change kernel color to red
    var kernel = document.getElementById("kernel");
    kernel.style.backgroundColor = "red";
    var kp = document.getElementById("k-p");
    // Handle the timer interrupt for 4 seconds and update the contents for every 1 second
    var i = 0;
    var interval = setInterval(function () {
        dots = "";
        for (var j = 0; j < i; j++) dots += ".";
        kp.innerHTML = "Handling read Interrupt and context switching" + dots;
        i++;
        if (i == 5) {
            clearInterval(interval);
            runInit();
            InterruptRead = 0;
        }
    }, 1000);    
}

function runInit() {
    ctxtSwitch = 2;
    var asmTable = document.getElementById("asmInstructions");
    for (var i = 0; i < 14; i++) {
        asmTable.deleteRow(-1);
    }

    var details = document.getElementById("details");
    details.rows[0].cells[1].innerHTML = st_IR;
    details.rows[1].cells[1].innerHTML = st_PC;

    var mode_details = document.getElementById("mode-details");
    mode_details.rows[0].cells[1].innerHTML = "1";
    mode_details.rows[1].cells[1].innerHTML = "0";

    var reg_details = document.getElementById("reg-details");
    reg_details.rows[0].cells[1].innerHTML = "%rbp, %rsp, %eax";

    var table = document.getElementById("int");
    table.rows[0].cells[1].innerHTML = " - ";

    var PCB = document.getElementById("PCB");
    PCB.rows[1].cells[1].innerHTML = "pid0";
    PCB.rows[2].cells[1].innerHTML = "Running";
    PCB.rows[4].cells[1].innerHTML = "5";

    var mem = document.getElementById("Memory");
    mem.deleteRow(1);

    var stack = document.getElementById("stack");
    stack.deleteRow(-1);
    var stackRow = stack.insertRow(-1);
    cell = stackRow.insertCell(0);
    cell.innerHTML = "%rbp";
    stackRow = stack.insertRow(-1);
    cell = stackRow.insertCell(0);
    cell.innerHTML = "$5 in -8(%rbp)";

    var kernel = document.getElementById("kernel");
    kernel.style.backgroundColor = "green";
    var kp = document.getElementById("k-p");
    kp.innerHTML = "Kernel";

    var asmRow = asmTable.insertRow(-1);
    var cell0 = asmRow.insertCell(0);
    cell0.innerHTML = "000.";
    var cell1 = asmRow.insertCell(1);
    cell1.innerHTML = "pushq %rbp";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell0.innerHTML = "001.";
    cell1 = asmRow.insertCell(1);
    cell1.innerHTML = "movq %rsp, %rbp";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell0.innerHTML = "002.";
    cell1 = asmRow.insertCell(1);
    cell1.innerHTML = "movl $5, -8(%rbp)";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell0.innerHTML = "003.";
    cell1 = asmRow.insertCell(1);
    cell1.innerHTML = "movl -8(%rbp), %eax";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell0.innerHTML = "004.";
    cell1 = asmRow.insertCell(1);
    cell1.innerHTML = "addl $5, %eax";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell0.innerHTML = "005.";
    cell1 = asmRow.insertCell(1);
    cell1.innerHTML = "movl %eax, -4(%rbp)";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell0.innerHTML = "006.";
    cell1 = asmRow.insertCell(1);
    cell1.innerHTML = "movl -4(%rbp), %eax";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell0.innerHTML = "007.";
    cell1 = asmRow.insertCell(1);
    cell1.innerHTML = "popq %rbp";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell0.innerHTML = "008.";
    cell1 = asmRow.insertCell(1);
    cell1.innerHTML = "ret";


//     000. pushq  %rbp                       
// 001.   movq    %rsp, %rbp            
// 002.   movl    $5, -8(%rbp)        
// 003.   movl    -8(%rbp), %eax      
// 004.   addl    $5, %eax   
// 005.   movl    %eax, -4(%rbp)      
// 006.   movl    -4(%rbp), %eax      
// 007.   popq    %rbp               
// 008.   ret

}

function TimerInterrupt() {

    if (timerInterrupt == 1) {
        // timerInterrupt = 0;
        return;
    }

    timerInterrupt = 1;

    var asmTable = document.getElementById("asmInstructions");
    asmTable.rows[5].style.backgroundColor = "red";
    asmTable.rows[4].style.backgroundColor = "white";

    var details = document.getElementById("details");
    details.rows[0].cells[1].innerHTML = "$$$";
    details.rows[1].cells[1].innerHTML = "$$$";

    var mode_details = document.getElementById("mode-details");
    mode_details.rows[0].cells[1].innerHTML = "0";
    mode_details.rows[1].cells[1].innerHTML = "1";

    var reg_details = document.getElementById("reg-details");
    reg_details.rows[0].cells[1].innerHTML = " ..... ";

    var table = document.getElementById("int");
    table.rows[0].cells[1].innerHTML = "Timer Interrupt";

    var PCB = document.getElementById("PCB");
    PCB.rows[2].cells[1].innerHTML = "Ready";
    PCB.rows[4].cells[1].innerHTML = "5";

    var memTable = document.getElementById("Memory");
    var memRow = memTable.insertRow(-1);
    var cell = memRow.insertCell(0);
    cell.innerHTML = "pid0";

    var stack = document.getElementById("stack");
    stack.deleteRow(-1);
    stack.deleteRow(-1);
    var stackRow = stack.insertRow(-1);
    cell = stackRow.insertCell(0);
    cell.innerHTML = "Stack";

    // Change kernel color to red
    var kernel = document.getElementById("kernel");
    kernel.style.backgroundColor = "red";
    var kp = document.getElementById("k-p");
    // Handle the timer interrupt for 4 seconds and update the contents for every 1 second
    var i = 0;
    var interval = setInterval(function () {
        dots = "";
        for (var j = 0; j < i; j++) dots += ".";
        kp.innerHTML = "Handling timer Interrupt and context switching" + dots;
        i++;
        if (i == 5) {
            clearInterval(interval);
            runP1();
            timerInterrupt = 0;
        }
    }, 1000);

}

function runP1() {

    var details = document.getElementById("details");
    details.rows[0].cells[1].innerHTML = "0";
    details.rows[1].cells[1].innerHTML = "1";

    var mode_details = document.getElementById("mode-details");
    mode_details.rows[0].cells[1].innerHTML = "1";
    mode_details.rows[1].cells[1].innerHTML = "0";

    var reg_details = document.getElementById("reg-details");
    reg_details.rows[0].cells[1].innerHTML = "-";

    var table = document.getElementById("int");
    table.rows[0].cells[1].innerHTML = " - ";

    var PCB = document.getElementById("PCB");
    PCB.rows[1].cells[1].innerHTML = "pid1";
    PCB.rows[2].cells[1].innerHTML = "Running";
    PCB.rows[4].cells[1].innerHTML = "0";

    var asmTable = document.getElementById("asmInstructions");
    for (var i = 0; i < 9; i++) {
        asmTable.deleteRow(-1);
    }

    var asmRow = asmTable.insertRow(-1);
    var cell0 = asmRow.insertCell(0);
    var cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "000.";
    cell1.innerHTML = "pushq %rbp";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "001.";
    cell1.innerHTML = "movq %rsp, %rbp";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "002.";
    cell1.innerHTML = "subq $16, %rsp";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "003.";
    cell1.innerHTML = "movq %fs:40, %rax";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "004.";
    cell1.innerHTML = "movq %rax, -8(%rbp)";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "005.";
    cell1.innerHTML = "xorl %eax, %eax";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "006.";
    cell1.innerHTML = "leaq -16(%rbp), %rax";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "007.";
    cell1.innerHTML = "movq %rax, %rsi";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "008.";
    cell1.innerHTML = "leaq .LC0(%rip), %rdi";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "009.";
    cell1.innerHTML = "movl $0, %eax";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "010.";
    cell1.innerHTML = "call __scanf@PLT";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "011.";
    cell1.innerHTML = "movl -16(%rbp), %eax";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "012.";
    cell1.innerHTML = "addl $5, %eax";

    asmRow = asmTable.insertRow(-1);
    cell0 = asmRow.insertCell(0);
    cell1 = asmRow.insertCell(1);
    cell0.innerHTML = "....";
    cell1.innerHTML = "... .... .... ....";

    var kernel = document.getElementById("kernel");
    kernel.style.backgroundColor = "green";
    var kp = document.getElementById("k-p");
    kp.innerHTML = "Kernel";

    ctxtSwitch = 1;

    // asmRow = asmTable.insertRow(-1);
    // cell0 = asmRow.insertCell(0);
    // cell1 = asmRow.insertCell(1);
    // cell0.innerHTML = "014.";
    // cell1.innerHTML = "movl -12(%rbp), %eax";

    // asmRow = asmTable.insertRow(-1);
    // cell0 = asmRow.insertCell(0);
    // cell1 = asmRow.insertCell(1);
    // cell0.innerHTML = "015.";
    // cell1.innerHTML = "movl -8(%rbp), %rdx";

    // asmRow = asmTable.insertRow(-1);
    // cell0 = asmRow.insertCell(0);
    // cell1 = asmRow.insertCell(1);
    // cell0.innerHTML = "016.";
    // cell1.innerHTML = "xorq %fs:40, %rdx";

    // asmRow = asmTable.insertRow(-1);
    // cell0 = asmRow.insertCell(0);
    // cell1 = asmRow.insertCell(1);
    // cell0.innerHTML = "017.";
    // cell1.innerHTML = "je .L3";

    // asmRow = asmTable.insertRow(-1);
    // cell0 = asmRow.insertCell(0);
    // cell1 = asmRow.insertCell(1);
    // cell0.innerHTML = "018.";
    // cell1.innerHTML = "call __stack_chk_fail";

    // asmRow = asmTable.insertRow(-1);
    // cell0 = asmRow.insertCell(0);
    // cell0.innerHTML = "L3:";
    // cell1 = asmRow.insertCell(1);
    // cell1.innerHTML = "leave";

    // asmRow = asmTable.insertRow(-1);
    // cell0 = asmRow.insertCell(0);
    // cell0.innerHTML = "021.";
    // cell1 = asmRow.insertCell(1);
    // cell1.innerHTML = "ret";



    // 000. pushq  %rbp
    // 001.    movq    %rsp, %rbp
    // 002.    subq    $16, %rsp
    // 003.    movq    %fs:40, %rax
    // 004.    movq    %rax, -8(%rbp)
    // 005.    xorl    %eax, %eax
    // 006.    leaq    -16(%rbp), %rax
    // 007.    movq    %rax, %rsi
    // 008.    leaq    .LC0(%rip), %rdi
    // 009.    movl    $0, %eax
    // 010.    call    __isoc99_scanf@PLT
    // 011.    movl    -16(%rbp), %eax
    // 012.    addl    $5, %eax
    // 013.    movl    %eax, -12(%rbp)
    // 014.    movl    -12(%rbp), %eax
    // 015.    movq    -8(%rbp), %rdx
    // 016.    xorq    %fs:40, %rdx
    // 017.    je  .L3
    // 018.    call    __stack_chk_fail@PLT
    // 019. .L3:
    // 020.    leave
    // 021.   ret

}

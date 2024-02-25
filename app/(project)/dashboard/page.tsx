import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Charts } from "./charts";
import { RecentTickets } from "./recentTickets";
import prisma from "@/prisma/client";
import authOptions from "@/app/api/auth/authOptions";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
  RocketIcon,
  PlayIcon,
} from "@radix-ui/react-icons";

const DashBoardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const tickets = await prisma.ticket.findMany({
    where: {
      email: session.user!.email!,
    },
  });

  const newestTickets = await prisma.ticket.findMany({
    where: {
      email: session.user!.email!,
    },
    orderBy: {
      date: "desc",
    },
    take: 5,
  });

  const currentDate = new Date();

  const countMonth = (month: number) => {
    const totalTicketsThisMonth = tickets.filter((ticket) => {
      return ticket.date.getMonth() === month;
    });
    const ticketsThisMonth = totalTicketsThisMonth.length;
    const openedThisMonth = totalTicketsThisMonth.filter(
      (ticket) => ticket.status === "open"
    ).length;
    const closedThisMonth = totalTicketsThisMonth.filter(
      (ticket) => ticket.status === "done"
    ).length;
    const inProgressThisMonth = totalTicketsThisMonth.filter(
      (ticket) => ticket.status === "in_progress"
    ).length;
    const backLogThisMonth = totalTicketsThisMonth.filter(
      (ticket) => ticket.status === "backlog"
    ).length;
    const cancelledThisMonth = totalTicketsThisMonth.filter(
      (ticket) => ticket.status === "canceled"
    ).length;
    const toDoThisMonth = totalTicketsThisMonth.filter(
      (ticket) => ticket.status === "todo"
    ).length;
    return {
      ticketsThisMonth,
      openedThisMonth,
      closedThisMonth,
      inProgressThisMonth,
      backLogThisMonth,
      cancelledThisMonth,
      toDoThisMonth,
    };
  };

  const percentageIncrease = (current: number, previous: number) => {
    if (previous === 0 && current === 0) return "+0% from last month";
    else if (previous === 0) return `+100% from last month`;
    else if (current === 0) return `-100% from last month`;
    else if (previous > current)
      return `-${(previous - current) / previous}% from last month`;
    return `+${((current - previous) / current) * 100}% from last month`;
  };

  // Current Total Tickets
  let opened = 0;
  let closed = 0;
  let inProgress = 0;
  let backLog = 0;
  let cancelled = 0;
  let toDo = 0;
  const count = tickets.length;
  if (count !== 0) {
    opened = Math.round(
      (tickets.filter((ticket) => ticket.status === "open").length / count) *
        100
    );
    closed = Math.round(
      (tickets.filter((ticket) => ticket.status === "done").length / count) *
        100
    );
    inProgress = Math.round(
      (tickets.filter((ticket) => ticket.status === "in_progress").length /
        count) *
        100
    );
    backLog = Math.round(
      (tickets.filter((ticket) => ticket.status === "backlog").length / count) *
        100
    );
    cancelled = Math.round(
      (tickets.filter((ticket) => ticket.status === "canceled").length /
        count) *
        100
    );
    toDo = Math.round(
      (tickets.filter((ticket) => ticket.status === "todo").length / count) *
        100
    );
  }

  const current = countMonth(currentDate.getMonth());
  const previous = countMonth(currentDate.getMonth() - 1);
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <RocketIcon
              className="h-4 w-4 text-muted-foreground"
              color="blue"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{count}</div>
            <p className="text-xs text-muted-foreground">
              {percentageIncrease(
                current.ticketsThisMonth,
                previous.ticketsThisMonth
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opened</CardTitle>
            <CircleIcon
              className="h-4 w-4 text-muted-foreground"
              color="purple"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{opened}%</div>
            <p className="text-xs text-muted-foreground">
              {percentageIncrease(
                current.openedThisMonth,
                previous.openedThisMonth
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircledIcon
              className="h-4 w-4 text-muted-foreground"
              color="green"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{closed}%</div>
            <p className="text-xs text-muted-foreground">
              {percentageIncrease(
                current.closedThisMonth,
                previous.closedThisMonth
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <StopwatchIcon
              className="h-4 w-4 text-muted-foreground"
              color="pink"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgress}%</div>
            <p className="text-xs text-muted-foreground">
              {percentageIncrease(
                current.inProgressThisMonth,
                previous.inProgressThisMonth
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tickets this month
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{current.ticketsThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              {percentageIncrease(
                current.ticketsThisMonth,
                previous.ticketsThisMonth
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Back Log</CardTitle>
            <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{backLog}%</div>
            <p className="text-xs text-muted-foreground">
              {percentageIncrease(
                current.backLogThisMonth,
                previous.backLogThisMonth
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <CrossCircledIcon
              className="h-4 w-4 text-muted-foreground"
              color="red"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cancelled}%</div>
            <p className="text-xs text-muted-foreground">
              {percentageIncrease(
                current.cancelledThisMonth,
                previous.cancelledThisMonth
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              To Do This Month
            </CardTitle>
            <PlayIcon className="h-4 w-4 text-muted-foreground" color="green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{toDo}%</div>
            <p className="text-xs text-muted-foreground">
              {percentageIncrease(
                current.toDoThisMonth,
                previous.toDoThisMonth
              )}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-10">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex justify-center">
              Tickets for the year {currentDate.getFullYear()}
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Charts tickets={tickets} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
            <CardDescription>
              You made {current.ticketsThisMonth} tickets this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTickets
              tickets={newestTickets}
              image={session.user?.image}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashBoardPage;

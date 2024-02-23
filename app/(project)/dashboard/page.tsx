import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Charts } from "./charts";
import { RecentTickets } from "./recentTickets";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";
import { redirect } from "next/navigation";

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
  const count = tickets.length;
  const opened = Math.round(
    (tickets.filter((ticket) => ticket.status === "open").length / count) * 100
  );
  const closed = Math.round(
    (tickets.filter((ticket) => ticket.status === "done").length / count) * 100
  );
  const inProgress = Math.round(
    (tickets.filter((ticket) => ticket.status === "in_progress").length /
      count) *
      100
  );
  const backLog = Math.round(
    (tickets.filter((ticket) => ticket.status === "backlog").length / count) *
      100
  );
  const cancelled = Math.round(
    (tickets.filter((ticket) => ticket.status === "canceled").length / count) *
      100
  );
  const toDo = Math.round(
    (tickets.filter((ticket) => ticket.status === "todo").length / count) * 100
  );

  const current = countMonth(currentDate.getMonth());
  const previous = countMonth(currentDate.getMonth() - 1);
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
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
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
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
            <CardTitle className="text-sm font-medium">opened</CardTitle>
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
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
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
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
            <CardTitle>Overview</CardTitle>
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
